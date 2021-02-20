package encore.web.util;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class ServletUtil {

    private static final Logger log = Logger.getLogger(ServletUtil.class);

    public static Map<String, Object> getParameters(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<String, Object>();
        Enumeration enums = request.getParameterNames();
        while (enums.hasMoreElements()) {
            String key = (String) enums.nextElement();
            String value = request.getParameter(key);

            if (request.getParameterValues(key).length > 1) {
                params.put(key, request.getParameterValues(key));
            } else {
                if (value != null && !value.equals("")) {
                    // 숫자형일 경우에만 변환 작업을 수행한다.
                    if (value.matches("[0-9.]{0,}")) {
                        // 0으로 시작하는 코드성 데이터는 형변환에서 제외한다.
                        if (!(value.length() > 1 && value.startsWith("0"))) {
                            if (value.indexOf(".") > -1) {
                                try {
                                    params.put(key, Float.parseFloat(value));
                                    log.debug("(F) : " + key + ":" + value);
                                } catch (Exception e) {
                                    params.put(key, Double.parseDouble(value));
                                    log.debug("(D) : " + key + ":" + value);
                                }

                            } else {
                                try {
                                    params.put(key, Integer.parseInt(value));
                                    log.debug("(I)" + key + ":" + value);
                                } catch (Exception e) {
                                    log.debug("(L)" + key + ":" + value);
                                    params.put(key, Long.parseLong(value));
                                }
                            }
                        } else {
                            log.debug("(CD)" + key + ":" + value);
                            params.put(key, value);
                        }
                    } else {
                        log.debug("(S)" + key + ":" + value);
                        params.put(key, value);
                    }
                } else {
                    params.put(key, "");
                }
            }

        }
        return params;
    }
}
