package encore.web.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.*;

@Repository("commonDao")
public class CommonDaoImpl extends SqlSessionDaoSupport implements encore.web.dao.CommonDao {

	/**
	 * Meta 데이터 카운트 조회 (공통)
	 * 
	 * @param sqlId		sql id
	 * @param params	파라미터 값
	 */
	@Override
	public int getDataCount(String sqlId, Map params) throws DataAccessException {
		Integer ret = (Integer) getSqlSession().selectOne(sqlId, params);
		return ret == null ? 0 : ret.intValue(); 
	}
	
	/**
	 * 데이타 목록을 조회한다. (공통)
	 * List의 데이타는 Map으로 담겨서 내려온다.
	 * 
	 * @param sqlId		sql id
	 * @param params	파라미터 값
	 */
	@Override
	public List getDataList(String sqlId, Map params) throws DataAccessException {
		return getSqlSession().selectList(sqlId, params);
	}

	/**
	 * 단건 데이타 정보를 조회한다. (공통)
	 * 
	 * @param sqlId		sql id
	 * @param params	파라미터 값
	 */
	@Override
	public Object getData(String sqlId, Map params) throws DataAccessException {
		return getSqlSession().selectOne(sqlId, params);
	}
	
	/**
	 * 프로시져 call을 수행한다.	  
	 * @param sqlId		sql id
	 * @param params	파라미터 값
	 * @return out 파라메터로 반환된 파라메터명(key)과 그 결과객체(value)를 담은 Map
	 */
	@Override
	public Map<String, Object> callProcedure(String sqlId, Map params) throws DataAccessException {
		HashMap<String, Object> outParams = (HashMap<String, Object>) params;
		outParams =  (HashMap<String, Object>) outParams.clone();
		
		getSqlSession().selectOne(sqlId, outParams);
		
		Set inParamKeySet = params.keySet();		
		for(Object key : inParamKeySet) {
			outParams.remove(key);
		}
		return outParams;
	}
	

	/**
	 * 데이터 Insert (공통)
	 * 
	 * @param sqlId		sql id
	 * @param params	파라미터 값
	 */
	@Override
	public Object insert(String sqlId, Map params) throws DataAccessException {
		return getSqlSession().insert(sqlId, params);
	}

	/**
	 * 데이터 Update (공통)
	 * 
	 * @param sqlId		sql id
	 * @param params 	파라미터 값
	 */
	@Override
	public int update(String sqlId, Map params) throws DataAccessException {
		return getSqlSession().update(sqlId, params);
	}

	/**
	 * 데이터 Delete (공통)
	 * 
	 * @param sqlId		sql id
	 * @param params	파라미터 값
	 */
	@Override
	public int delete(String sqlId, Map params) throws DataAccessException {
		return getSqlSession().delete(sqlId, params);
	}

	/**
	 * 쿼리 실행 
	 * sqlmap을 통하면 자체의 쿼리 캐쉬 기능때문에 정상적인 작동이 어려워서 
	 * jdbc로 바로 커넥션을 맺고 작업을 수행한다.
	 * 
	 * @param	query	수행쿼리
	 */
	@Override
	public List getQueryData(String query, int limit) throws DataAccessException {
		Connection conn = DataSourceUtils.getConnection(getSqlSession().getConfiguration().getEnvironment().getDataSource());
		Statement stmt = null;
		ResultSet rs = null;
		List list = new ArrayList();
		
		String execQuery = String.format("SELECT * FROM (%s) WHERE rownum <= %d", new Object[] { query, limit } );
		
		if (conn != null) {
			try {
				stmt = conn.createStatement();
				rs = stmt.executeQuery(execQuery);
				ResultSetMetaData rsmd = rs.getMetaData();
				
				while (rs.next()) {
					Map row = new HashMap();
					for (int i = 1; i <= rsmd.getColumnCount(); i++) {
						row.put(rsmd.getColumnName(i).toUpperCase(), rs.getString(i));
					}
					list.add(row);
				}
			} catch (Exception e) {
				HashMap errorMap = new HashMap();
				errorMap.put("success", "false");
				errorMap.put("msg", e.getMessage());
				
				list.add(errorMap);
			} finally {
				if (rs != null) {
					try {
						rs.close();
						rs = null;						
					} catch (Exception e2) {
					}
				}
				
				if (stmt != null) {
					try {
						stmt.close();
						stmt = null;						
					} catch (Exception e2) {
					}
				}
				DataSourceUtils.releaseConnection(conn, getSqlSession().getConfiguration().getEnvironment().getDataSource());
			}
		}
		
		return list;
	}

	@Override
	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	
	
}
