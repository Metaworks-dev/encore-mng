package encore.web.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import encore.web.service.CommonService;

import encore.web.service.ProjWorkService;
import encore.web.util.CollectionUtil;
import encore.web.util.DebugUtil;
import encore.web.util.ServletUtil;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class JsonDataController {

    private Logger logger = LoggerFactory.getLogger(JsonDataController.class);
	private Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
	
	@Autowired
	private CommonService commonService;

	@Autowired
	private ProjWorkService projWorkService;

	@Autowired
	ServletContext servletContext;

	@Autowired
	private ResourceLoader resourceLoader;


	@RequestMapping(value = "/json")
    public @ResponseBody Map<String, Object> json(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        Map<String, Object> params = ServletUtil.getParameters(request);

		printResultData(params);

        String ns = StringUtils.defaultString(request.getParameter("ns"), "common");
        String id = StringUtils.defaultString(request.getParameter("id"));
        String cnt = StringUtils.defaultString(request.getParameter("cnt"));
        
        if (id.equals("")) {
        	throw new Exception("error id");
        }
        
        // 현재 클라이언트의 HttpSession을 받는다.
        HttpSession session = request.getSession(false);

        // 세션이 종료되었으면 에러메시지를 리턴한다.
        if (session == null) {
            returnMap.put("success", "false");
            returnMap.put("msg", "세션이 종료되었습니다.");
            returnMap.put("returnUrl", "login");
            return returnMap;
        }

        if (logger.isInfoEnabled()) {
        	logger.debug("session.getMaxInactiveInterval():" + session.getMaxInactiveInterval());	
        }                

        String userid = StringUtils.defaultString((String) session.getAttribute("USERID"), "");
        String USER_UID = StringUtils.defaultString((String) session.getAttribute("USER_UID"), "");

		int SESS_EMP_ID = (int) session.getAttribute("SESS_EMP_ID");

        params.put("USERID", userid);
        params.put("USER_UID", USER_UID);
        params.put("SESS_EMP_ID", SESS_EMP_ID);

        if (logger.isDebugEnabled()) {
        	logger.debug(gson.toJson(params));
        }

		returnMap = getStringObjectMap(request, returnMap, params, ns, id, cnt);

		printResultData(returnMap);

        return returnMap;
    }
	
	
    @RequestMapping("/jsonTree")
	public @ResponseBody Map jsonTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String ret = "";
		
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> params = ServletUtil.getParameters(request);

	       String ns = StringUtils.defaultString(request.getParameter("ns"), "common");
	        String id = StringUtils.defaultString(request.getParameter("id"));
//	        String cnt = StringUtils.defaultString(request.getParameter("cnt"));
		
		// 현재 클라이언트의 HttpSession을 받는다.
//		HttpSession session = request.getSession(false);
//		
//		String user_login_id = StringUtils.defaultString((String) session.getAttribute("user_login_id"), "");
//		int chrg_memb_id = (Integer) session.getAttribute("chrg_memb_id");
//		
//		params.put("user_login_id", user_login_id);
//		params.put("chrg_memb_id", chrg_memb_id);
//		params.put("login_cust_no", chrg_memb_id);
//		
//		if (logger.isDebugEnabled()) {
//			logger.debug(gson.toJson(params));	
//		}
				
		String rootId = StringUtils.defaultString(request.getParameter("rootId"), "rows");
		
		List list = commonService.getDataList(ns + "." + id, params);
		
		Map map = new HashMap();
//		map.put(rootId, list);
		map.put("children", list);
		
		System.out.println(map);
		
		return map;
	}

	private Map<String, Object> getStringObjectMap(HttpServletRequest request, Map<String, Object> returnMap, Map<String, Object> params, String svc, String sql, String cnt) {
		System.out.println(">>>> getStringObjectMap");
		System.out.println(svc + "." + sql);
		try {
			if (sql.startsWith("get")) {
				List rows = null;
				int totalCnt = 0;

				if (cnt.equals("")) {
					// 페이징 처리 없을 경우
					rows = commonService.getDataList(svc + "." + sql, params);
					totalCnt = rows.size();
				} else {
					// 페이징 처리 할 경우
					int page = Integer.parseInt(StringUtils.defaultString(request.getParameter("page"), "1")) - 1;
					int limit = Integer.parseInt(StringUtils.defaultString(request.getParameter("limit"), "0"));

					params.put("page", page * limit);

					rows = commonService.getDataList(svc + "." + sql, params);
					totalCnt = commonService.getDataCount(svc + "." + cnt, params);
				}

				if (rows.size() > 0) {
					if (rows.get(0) instanceof Map) {
						Map metaData = CollectionUtil.getGridMetaData((Map) rows.get(0));
						returnMap.put("metaData", metaData);
					} else if (rows.get(0) instanceof Integer) {
						returnMap.put("cnt", rows.get(0));
					}
				} else {
					Map metaData = new HashMap();
					metaData.put("totalProperty", "total");
					metaData.put("root", "rows");

					returnMap.put("metaData", metaData);
				}

				returnMap.put("rows", rows);
				returnMap.put("total", totalCnt);
			} else if (sql.startsWith("insert")) {
				Object obj = commonService.insert(svc + "." + sql, params);
				returnMap.put("data", obj);
			} else if (sql.startsWith("update")) {
				Object obj = commonService.update(svc + "." + sql, params);
				returnMap.put("data", obj);
			} else if (sql.startsWith("delete")) {
				Object obj = commonService.delete(svc + "." + sql, params);
				returnMap.put("data", obj);
			} else if (sql.startsWith("exec") || sql.startsWith("tx")) {
				executeMethod(returnMap, params, svc, sql);
			}

			if (!returnMap.containsKey("success")) {
				returnMap.put("success", "true");
			}
		} catch (Exception e) {
			logger.warn(e.getMessage());
			e.printStackTrace();
			returnMap.put("success", "false");
			returnMap = returnExceptionMessage(e);
		}
		return returnMap;
	}

	private void executeMethod(Map<String, Object> returnMap, Map<String, Object> params, String svc, String sql) throws Exception {
		Class[] paramTypes = new Class[] { params.getClass() };
		
		Method method = null;
		Object obj = null;
		
		if (svc.equals("common")) {
			method = CommonService.class.getMethod(sql, paramTypes);
			obj = method.invoke(commonService, new Object[] { params });
		} else if (svc.equals("projwork")) {
			method = ProjWorkService.class.getMethod(sql, paramTypes);
			obj = method.invoke(projWorkService, new Object[] { params });
		}
		
		String success = StringUtils.defaultString((String) params.get("success"));
		String msg = StringUtils.defaultString((String) params.get("msg"));

		if (!success.equals("false")) {
			if (obj instanceof List) {
				List rows = (List) obj;
				if (rows.size() > 0) {
					Map metaData = CollectionUtil.getGridMetaData((Map) rows.get(0));
					returnMap.put("metaData", metaData);
				}

				returnMap.put("total", StringUtils.defaultString((String) params.get("totalCnt"), "" + rows.size()));
				returnMap.put("rows", rows);
			} else {
				System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				System.out.println(obj);
				returnMap.put("data", obj);
			}
		} else {
			returnMap.put("success", "false");
			returnMap.put("msg", msg);
		}
	}

	private Map<String, Object> returnExceptionMessage(Exception e) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap.put("success", "false");
		
		StringBuffer errorMsg = new StringBuffer();
		errorMsg.append(e.getCause() + "\n");
		for (int i = 0 ; i < 2 ; i++) {
			errorMsg.append("\t at " + e.getCause().getStackTrace()[i] + "\n");
		}
		returnMap.put("msg", errorMsg.toString());
		
		if (logger.isDebugEnabled()) {
			logger.debug((String) returnMap.get("msg"));
		}
		return returnMap;
	}

	private void printResultData(Map<String, Object> returnMap) {
        int printSize = 3000;
		if (logger.isDebugEnabled()) {
			String jsonData = gson.toJson(returnMap);

			DebugUtil.printHeaderData("Response Json Data", StringUtils.substring(jsonData, 0, printSize)
							+ (jsonData.length() > printSize ? "\n..." : ""));
			logger.debug("response data " + jsonData.length() + " byte");
		}
	}
}
