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
		HttpSession session = request.getSession(false);

		String email = StringUtils.defaultString(request.getParameter("EMAIL"));
		Map params = ServletUtil.getParameters(request);

		Map userInfo = (Map) commonService.getData("employ.getEmpList", params);

		String ip = request.getRemoteAddr();

		if (userInfo == null) {
			returnMap.put("success", "false");
			returnMap.put("errorMsg", "존재하지 않는 사용자입니다.");
			returnMap.put("errorField", "email");
			returnMap.put("email", email);
			ModelAndView mv = new ModelAndView("/login");
			mv.addObject("errorMsg", "이메일/패스워드를 확인해 주세요.");

			return mv;
//			return new ModelAndView("/login", returnMap);
		} else {
//			CookieUtil.setCookie(response, "EMAIL", (String) userInfo.get("EMAIL"));
			session.setAttribute("EMAIL", userInfo.get("EMAIL"));

//			CookieUtil.setCookie(response, "EMP_ID", (String) userInfo.get("EMP_ID"));
			session.setAttribute("SESS_EMP_ID", userInfo.get("EMP_ID"));
			return new ModelAndView("redirect:/index");			
		}
	}
	

	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession(false);
		
		if (!request.getSession().isNew()) {
//			CookieUtil.unsetCookie(response, "EMAIL");
			session.invalidate();
		}
		
		return new ModelAndView("redirect:/login");
	}
}