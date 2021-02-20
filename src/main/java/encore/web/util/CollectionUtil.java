package encore.web.util;

import encore.web.beans.JsonTreeDataBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;


/**
 * Collection 관련 유틸 클래스 
 * 
 * @author hkwee
 * @since  2011-04-13
 */
public class CollectionUtil {
	
    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(CollectionUtil.class);

	
	/**
	 * 맵에 담긴 컬럼명을 카멜케이스 표기로 바꿔서 리턴한다.
	 * 
	 * @param map
	 * @return
	 */
	public static Map convertMapKeyNameColumnToCamelCase(Map map) {
		Map ret = new HashMap();
		
		Iterator iter = map.keySet().iterator();
		while (iter.hasNext()) {
			String key = (String) iter.next();
			String value = (String) map.get(key);
			ret.put(underbarToCamelCase(key), value);
		}
		
		return ret;
	}
	
	/**
	 * 언더바가 들어간 문자열을 카멜케이스 표기로 바꿔서 리턴한다.
	 * 
	 * @param arg
	 * @return
	 */
	public static String underbarToCamelCase(String arg) {
		String ret = arg.toLowerCase();
		StringBuffer sb = new StringBuffer();

		try {

			int charIdx = 0;
			for (int i = 0; i < ret.length(); i++) {
				if (ret.charAt(i) == '_') {
					charIdx = i;
				} else {
					if (charIdx != 0 && (charIdx + 1) == i) {
						sb.append((char)(ret.charAt(i) - 32));
					} else {
						sb.append(ret.charAt(i));
					}
				}
			}

		} catch (Exception e) {
			ret = null;
		}

		return sb.toString();
	}
	
	

	/**
	 * 순환 참조 관계의 데이터를 Json 트리 데이터 형태로 출력하기 위한 메서드이다.
	 * 
	 * @param list	순환 참조 관계의 id, pid를 가지고 있는 데이터 리스트 
	 * @param jstd	데이터를 저장할 루트 객체
	 */
	public static void recursiveTreeData(List list, JsonTreeDataBean jstd) {
		// JsonTreeDataBean의 하위 노드를 리스트에 담는다.
		List selist = jstd.getChildren();
		
		if (jstd.getChildren().size() == 0 && jstd.getId().equals("-1")) {	// 하위 노드가 없고, ID가 ROOT인 경우
			for (int i = 0; i < list.size(); i++) {
				Map row = (Map) list.get(i);
				String pid = (String) row.get("pid");
				String id = (String) row.get("id");
				String nm = (String) row.get("text");
				String abbr = (String) row.get("abbr");
				String description = (String) row.get("description");
				
				if (pid.equals(jstd.getId())) {
					JsonTreeDataBean j = new JsonTreeDataBean();
					j.setText(nm);
					j.setId(id);
					j.setPid(pid);
					j.setAbbr(abbr);
					j.setDescription(description);
					
					jstd.getChildren().add(j);
				}			
			}
			
			recursiveTreeData(list, jstd);
		} else {
			for (int x = 0; x < selist.size(); x++) {
				JsonTreeDataBean tmp = (JsonTreeDataBean) selist.get(x);
				
				for (int i = 0; i < list.size(); i++) {
					Map row = (Map) list.get(i);
					String pid = (String) row.get("pid");
					String id = (String) row.get("id");
					String nm = (String) row.get("text");
					String abbr = (String) row.get("abbr");
					String description = (String) row.get("description");
					
					if (pid.equals(tmp.getId())) {
						JsonTreeDataBean j = new JsonTreeDataBean();
						j.setText(nm);
						j.setId(id);
						j.setPid(pid);
						j.setAbbr(abbr);
						j.setDescription(description);
						
						tmp.getChildren().add(j);
					}
				}
				
				recursiveTreeData(list, tmp);
				
				if (tmp.getChildren().size() == 0) {
					tmp.setLeaf(true);
					tmp.setExpanded(false);
				} else {
					tmp.setExpanded(true);
				}
			}
		}
	}
	

	

	/**
	 * <pre>
	 * Grid metaData 생성용 유틸 메서드
	 * 
	 * json ex)
	 * {
   		"total":0,
   		"totalProperty":"total",
   		"root":"rows",
   		"fields":[
      		"SHOW_ORD",
      		"UP_CD_ID",
      		"CD_NM",
      		"CD_CRE_DT",
      		"CD_DESC",
      		"CD_ID"
   			]
		}
	 * </pre>
	 * 
	 * @param 	map		sqlmap 에서 넘겨지는 맵 데이터 
	 * @return	metaData형태로 변환되어질 Map	
	 */
	public static Map getGridMetaData(Map map) {
		Map returnMap = new HashMap();
		
		Iterator iter = map.keySet().iterator();
		
		Object[] cols = new Object[map.size()];
		
		int idx = 0;
		while (iter.hasNext()) {
			String name = (String) iter.next();
			cols[idx++] = name;
		}
		
		returnMap.put("totalProperty", "total");
		returnMap.put("root", "rows");
		returnMap.put("fields", cols);
		
		return returnMap;
	}

	/**
	 * Grid metaData 컬럼 모델 생성용 유틸 메서드 
	 * 
	 * @param 	map		sqlmap 에서 넘겨지는 맵 데이터
	 * @return 	metaData 컬럼 모델 형태로 변환될 리스트	
	 */
	public static List getGridColumnModel(Map map) {
		Iterator iter = map.keySet().iterator();
		List list = new ArrayList();
		
		while (iter.hasNext()) {
			String name = (String) iter.next();
			Map col = new HashMap();
			col.put("header", name);
			col.put("dataIndex", name);
			list.add(col);
		}
		
		return list;
	}
	
	
}
