package encore.web.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import encore.web.service.CommonService;
import encore.web.util.CookieUtil;
import encore.web.util.ServletUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 로그인 관련 작업을 관리한다.
 * 
 * @author hkwee
 * @since 2020-05-10
 */
@Controller
public class LoginController {
	
	private static final Logger log = Logger.getLogger(LoginController.class);
	
	@Autowired
	private CommonService commonService;	
	
	private Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
	
	@RequestMapping("/register")
	public ModelAndView register(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map map = new HashMap();
		map.put("mode", "register");
		return new ModelAndView("login", "row", map);
	}
	
	@RequestMapping("/login")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return new ModelAndView("login");
	}
	
	@RequestMapping("/loginProc")
	public ModelAndView loginProc(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		
		// 세션 처리
		HttpSession session = request.getSession(false);
		
		String login_id = StringUtils.defaultString(request.getParameter("USERID"));
		String passwd = StringUtils.defaultString(request.getParameter("PASSWORD"));


		Map params = ServletUtil.getParameters(request);
		
		System.out.println(commonService);

		Map userInfo = (Map) commonService.getData("common.getUserid", params);

		String ip = request.getRemoteAddr();

		if (userInfo == null) {
			returnMap.put("success", "false");
			returnMap.put("errorMsg", "존재하지 않는 사용자입니다.");
			returnMap.put("errorField", "login_id");
			returnMap.put("login_id", login_id);
			
			return new ModelAndView("redirect:/login");
		} else {
			CookieUtil.setCookie(response, "USERID", (String) userInfo.get("USERID"));			
			session.setAttribute("USERID", userInfo.get("USERID"));
			session.setAttribute("USER_UID", userInfo.get("USER_UID"));
			
			return new ModelAndView("redirect:/index");			
		}
	}
	

	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession(false);
		
		if (!request.getSession().isNew()) {
			this.setLogoutInfo(request, response);
			
			CookieUtil.unsetCookie(response, "user_login_id");
			CookieUtil.unsetCookie(response, "chrg_memb_id");
			CookieUtil.unsetCookie(response, "memb_div_cd");

			session.invalidate();
		}
		
		return new ModelAndView("redirect:/login");
	}
	
	/**
	 * 로그인 이력
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void setLoginInfo(HttpServletRequest request, HttpServletResponse response, String userId) throws Exception {
		Map params = new HashMap();
		params.put("userId", userId);
		Map userInfo = (Map) commonService.getData("common.getUserInfo", params);
		
		long currentTime = System.currentTimeMillis();
		Date date = new Date(currentTime);
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMddHHmmss");
		
		if (log.isDebugEnabled()) {
			StringBuffer sb = new StringBuffer();
			sb.append("\n").append(StringUtils.repeat("-", 80));
			sb.append("\n#  Login User Info Log   ");
			sb.append("\n").append(StringUtils.repeat("-", 80));
			sb.append("\n# 사용자명    : " + (String) userInfo.get("USER_NM"));
			sb.append("\n# 사용자ID    : " + (String) userInfo.get("LOGIN_ID"));
			sb.append("\n# 소속부서    : " + (String) userInfo.get("POST"));
			sb.append("\n# 접속  IP    : " + request.getRemoteAddr());
			sb.append("\n# HOST  명    : " + request.getRemoteHost());
			sb.append("\n# 접속시간    : " + sdf1.format(date));
			sb.append("\n").append(StringUtils.repeat("-", 80));
			
			System.out.println(sb.toString());
		}
		
		params.clear();
		params.put("userId", (String) userInfo.get("USER_ID"));
		params.put("remoteIp", request.getRemoteAddr());
		params.put("remoteHost", request.getRemoteHost());
		params.put("loginDt", (String) sdf2.format(date));
		
		commonService.insert("common.insertLoginHistory", params);
	}
	
	/**
	 * 로그아웃 이력
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void setLogoutInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		long currentTime = System.currentTimeMillis();
		Date date = new Date(currentTime);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		HttpSession session = request.getSession(false);

		if (log.isDebugEnabled()) {
			StringBuffer sb = new StringBuffer();
			sb.append("\n").append(StringUtils.repeat("-", 80));
			sb.append("\n#  Logout User Info Log   ");
			sb.append("\n").append(StringUtils.repeat("-", 80));
			sb.append("\n# 로그인ID    : " + (String) session.getAttribute("LOGIN_ID"));
			sb.append("\n# 사용자명    : " + (String) session.getAttribute("USER_NM"));
			sb.append("\n# 사용자ID    : " + (String) session.getAttribute("USER_ID"));
			sb.append("\n# 로그아웃시간: " + sdf.format(date));
			sb.append("\n").append(StringUtils.repeat("-", 80));

			System.out.println(sb.toString());
		}
	}
	

	
}