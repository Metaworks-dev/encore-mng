package encore.web.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

/**
 * 쿠키와 관련된 유틸 클래스
 *  
 * @author hkwee
 * @since  
 */
public class CookieUtil {
	
	 private static String domain = "";
	 
	 /**
	  * 시스템 프로퍼티에 존재하는 도메인 명을 가져온다. 
	  * 
	  * @return domainName
	  */
	 private static String getDomain() {
//		 if (domain == null) {
//			 domain = SystemConfigData.getProperty("domain");
//		 }
		 return domain;
	 }

	/**
	  * 쿠키의 내용을 꺼내 온다
	  *
	  * @param request HttpServletRequest
	  * @param cookieName 가져올 쿠키의 이름
	  * @return String 쿠키의 값
	  */
	public static String getCookie(HttpServletRequest request, String cookieName) throws Exception {
		
		Cookie[] cookies = request.getCookies();
		
		if (cookies == null) {
			return "";
		}
			
		String value = "";
		for (int i = 0; i < cookies.length; i++) {
			if (cookieName.equals(cookies[i].getName())) {
				value = java.net.URLDecoder.decode(cookies[i].getValue(), "UTF-8");
				break;
			}
		}
		return value;
	}
	
	 /**
	  * 쿠키의 내용을 디코딩 하지 않고 꺼내 온다
	  *
	  * @param request HttpServletRequest
	  * @param cookieName 가져올 쿠키의 이름
	  * @return String 쿠키의 값
	  */
	public static String getPlainCookie(HttpServletRequest request, String cookieName) throws Exception {
		
		Cookie[] cookies = request.getCookies();
		
		if (cookies == null) {
			return "";
		}
			
		String value = "";
		for (int i = 0; i < cookies.length; i++) {
			if (cookieName.equals(cookies[i].getName())) {
				value = cookies[i].getValue();
				break;
			}
		}
		
		return value;
	}	
	

	/**
	 * 쿠키를 세팅한다.
	 * 
	 * @param response
	 * @param name
	 * @param value
	 * @throws UnsupportedEncodingException
	 */
	public static void setCookie(HttpServletResponse response, String name, String value) throws UnsupportedEncodingException {
		setCookie(response, getDomain(), name, value);
	}
	
	/**
	 * 쿠키를 세팅한다.
	 * 
	 * @param response
	 * @param domain
	 * @param name
	 * @param value
	 * @throws UnsupportedEncodingException
	 */
	public static void setCookie(HttpServletResponse response, String domain, String name, String value) 
		throws UnsupportedEncodingException {
		
		value = java.net.URLEncoder.encode(value, "UTF-8");
		Cookie cookie = new Cookie(name, value);
//		cookie.setDomain(domain);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
	/**
	 * 쿠키값을 삭제한다.
	 * 
	 * @param response
	 * @param cookieName
	 */
	public static void unsetCookie(HttpServletResponse response, String cookieName) {
		unsetCookie(response, getDomain(), cookieName);
	}
	
	public static void unsetCookie(HttpServletResponse response, String domain, String cookieName) {
		
		Cookie cookie = new Cookie(cookieName, "");
//		cookie.setDomain(domain);
		cookie.setMaxAge(0);
		cookie.setPath("/");
		
		response.addCookie(cookie);
	}
	
	/**
	 * 인코딩 되지 않은 쿠키를 만든다.
	 * 
	 * @param response
	 * @param name
	 * @param value
	 * @throws UnsupportedEncodingException
	 */
	public static void setPlainCookie(HttpServletResponse response, String name, String value) throws UnsupportedEncodingException {
		Cookie cookie = new Cookie(name, value);
//		cookie.setDomain(getDomain());
		cookie.setPath("/");
		response.addCookie(cookie);
	}	


	 /**
	  * 쿠키를 만든다
	  *
	  * @param response HttpServletResponse
	  * @param name 쿠키의 이름
	  * @param value 쿠키의 값
	  * @param iMinute 쿠키가 유효할 시간(분단위)
	 * @throws UnsupportedEncodingException
	  */
	public static void setCookie(HttpServletResponse response, String name, String value, int iMinute) throws UnsupportedEncodingException {
		value = java.net.URLEncoder.encode(value, "euc-kr");
		Cookie cookie = new Cookie(name, value);
		cookie.setMaxAge(60 * iMinute);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
	/**
	 * 인코딩 되지 않은 쿠키를 만든다.
	 * 
	 * @param response
	 * @param name
	 * @param value
	  * @param iMinute 쿠키가 유효할 시간(분단위)
	 * @throws UnsupportedEncodingException
	 */
	public static void setPlainCookie(HttpServletResponse response, String name, String value, int iMinute) throws UnsupportedEncodingException {
		Cookie cookie = new Cookie(name, value);
//		cookie.setDomain(getDomain());
		cookie.setMaxAge(60 * iMinute);
		cookie.setPath("/");
		response.addCookie(cookie);
	}	
}