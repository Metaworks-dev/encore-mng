package encore.web.filter;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;

/**
 * Request Parameter Log Filter
 *
 */
public class ParameterLogFilter implements Filter {
    
	private static final Logger log = Logger.getLogger(ParameterLogFilter.class);
    
    public ParameterLogFilter() {
    }

    public void init(FilterConfig filterConfig) throws ServletException {
    }

	public void doFilter(ServletRequest servletRequest,
			ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
				
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        
        try {
//        	if (request.getMethod().equals("POST")) {
//                if (log.isDebugEnabled()) {
                	StringBuffer sb = new StringBuffer();
                	sb.append("\n").append(StringUtils.repeat("-", 80));
                    sb.append("\n#  Parameter Log   ");
                    sb.append("\n").append(StringUtils.repeat("-", 80));
                    sb.append("\n# request URI    : " + request.getRequestURI());
                    sb.append("\n# query string   : " + request.getQueryString());
                    sb.append("\n# request method : " + request.getMethod());
                    sb.append("\n").append(StringUtils.repeat("-", 80));
                    
                    Enumeration enums = request.getParameterNames();
                    while (enums.hasMoreElements()) {
                        String name = (String) enums.nextElement();
                        String value = request.getParameter(name);

                        sb.append("\n").append(String.format("* %-20s : %s", name, value));            
                    }
                    sb.append("\n").append(StringUtils.repeat("-", 80));
                    
                    if (log.isDebugEnabled()) {
                    	log.debug(sb.toString());	
                    }
//                }
//        	}
        } catch (Exception e) {
        	e.printStackTrace();
        }
        
        filterChain.doFilter(servletRequest, servletResponse);
    }

    public void destroy() {
    	
    }
    
}