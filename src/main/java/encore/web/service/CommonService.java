package encore.web.service;


import org.springframework.dao.DataAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public interface CommonService {

    int getDataCount(String sqlId, Map params) throws DataAccessException;

    List getDataList(String sqlId, Map params) throws DataAccessException;

    Object getData(String sqlId, Map params) throws DataAccessException;

    List getQueryData(String query, int limit) throws DataAccessException;

    Object insert(String sqlId, Map params) throws DataAccessException;

    int update(String sqlId, Map params) throws DataAccessException;

    int delete(String sqlId, Map params) throws DataAccessException;

    List execGetQueryToolResult(HashMap params) throws DataAccessException;


}