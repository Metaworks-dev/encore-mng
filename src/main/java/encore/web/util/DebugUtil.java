package encore.web.util;


import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import java.util.Iterator;
import java.util.Map;

/**
 * 디버깅과 관련한 유틸 클래스
 * 
 * @author hkwee
 * @since 2011-08-11
 */
public class DebugUtil {

	private static Logger log = Logger.getLogger(DebugUtil.class);

	/**
	 * Map에 담긴 데이터를 프로퍼티명과 함께 값을 출력한다. 디버깅용으로 사용한다. log4j - debug에만 출력된다.
	 * 
	 * @param map		디버깅 데이터
	 */
	public static void printMap(Map map) {
		printMap(null, map);
	}
	
	/**
	 * Map에 담긴 데이터를 프로퍼티명과 함께 값을 출력한다. 디버깅용으로 사용한다. log4j - debug에만 출력된다.
	 * 
	 * @param map		디버깅 데이터
	 * @param header	출력헤더
	 */
	public static void printMap(String header, Map map) {
		if (map == null) {
			printHeaderData(header, "데이터 없음");
			return;
		} 
		
		StringBuffer sb = new StringBuffer();
		Iterator iter = map.keySet().iterator();
		String crlf = "";
		
		while (iter.hasNext()) {
			String key = (String) iter.next();
			sb.append(crlf).append(String.format("%20s : %s", new Object[] { key, map.get(key) }));
			
			if (crlf.equals("")) {
				crlf = "\n";
			}
		}
		
		printHeaderData(header, sb.toString());
	}
	
	/**
	 * data 출력시에 구분을 쉽게하기 위해 헤더를 붙여서 출력한다.
	 * 
	 * @param header	헤더명
	 * @param data		출력 데이터
	 */
	public static void printHeaderData(String header, String data) {
		StringBuffer sb = new StringBuffer();
		if (header != null) {
			sb.append("\n").append(StringUtils.repeat("-", 80));
			sb.append("\n").append(header);
		}
		
		sb.append("\n").append(StringUtils.repeat("-", 80));
		sb.append("\n").append(data);
		sb.append("\n").append(StringUtils.repeat("-", 80));
		
		log.debug(sb.toString());
	}


}
