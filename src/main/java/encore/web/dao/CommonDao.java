package encore.web.dao;

import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Map;

public interface CommonDao {
	int getDataCount(String sqlId, Map params) throws DataAccessException;
	List<Map<String, Object>> getDataList(String sqlId, Map params) throws DataAccessException;
	Object getData(String sqlId, Map params) throws DataAccessException;	
	Object insert(String sqlId, Map params) throws DataAccessException;
	int update(String sqlId, Map params) throws DataAccessException;
	int delete(String sqlId, Map params) throws DataAccessException;	
	List<Map<String, Object>> getQueryData(String query, int limit) throws DataAccessException;
	Map<String, Object> callProcedure(String sqlId, Map params) throws DataAccessException;
}

