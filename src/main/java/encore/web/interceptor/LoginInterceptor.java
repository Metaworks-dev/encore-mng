package encore.web.interceptor;

import encore.web.util.CookieUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller("loginInterceptor")
public class LoginInterceptor extends HandlerInterceptorAdapter {

	private static final String EMAIL = "EMAIL";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) throws Exception {
		HttpSession session = request.getSession();

		String ctxPath = request.getContextPath();
		String uri = request.getRequestURI();
		
		System.out.println("session : " + session);
		System.out.println("request.getContextPath() : " + ctxPath);
		System.out.println("request.getRequestURI() : " + request.getRequestURI());
		System.out.println("request.getRequestURL() : " + request.getRequestURL());
		System.out.println("session.getMaxInactiveInterval():" + session.getMaxInactiveInterval());
		
		System.out.println(uri);
		
		if (uri == null) {
			throw new ModelAndViewDefiningException(new ModelAndView("/login"));
		}
		
		if (uri.equals(ctxPath + "/login")
				|| uri.equals(ctxPath + "/loginProc")) {
			return true;
		}
		System.out.println("=======================================");
		System.out.println(session.getAttribute(EMAIL) );
		
		if (session.getAttribute(EMAIL) == null) {
			throw new ModelAndViewDefiningException(new ModelAndView("/login"));
		} 

		boolean isNew = false;

		try {
			isNew = session.isNew();
		} catch (Exception e) {
		}

		if (isNew) {			
			CookieUtil.unsetCookie(response, EMAIL);
		}
		
		if (session.getAttribute(EMAIL) == null) {
			CookieUtil.unsetCookie(response, EMAIL);
			throw new ModelAndViewDefiningException(new ModelAndView("/login"));
		}
		
//		if (!checkValidCookie(request, response, session)) {
//			throw new ModelAndViewDefiningException(new ModelAndView("/login"));
//		}

		return true;
	}

	/**
	 * 세션과 쿠키에 저장되어있는 값을 비교한다.
	 * 
	 * @param request
	 * @param session
	 * @return {Boolean} validUser
	 * @throws Exception
	 */
	private boolean checkValidCookie(HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
		boolean isValid = true;
		
		if (session.getAttribute(EMAIL) == null) {
			CookieUtil.unsetCookie(response, EMAIL);
			session.invalidate();
			return false;
		}
		
		if (CookieUtil.getCookie(request, EMAIL) == null) {
			CookieUtil.unsetCookie(response, EMAIL);
			session.invalidate();			
			return false;
		}

		isValid = CookieUtil.getCookie(request, EMAIL).equals((String) session.getAttribute(EMAIL));

		// 세 값 중 하나라도 일치하지 않을 경우, 쿠키와 세션을 모두 초기화한다.
		if (!isValid) {			
			CookieUtil.unsetCookie(response, EMAIL);
			session.invalidate();
		}

		return isValid;
	}

}