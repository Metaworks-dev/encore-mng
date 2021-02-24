package encore.web.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import encore.web.dao.CodeData;
import encore.web.dao.CommonDao;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CommonServiceImpl implements encore.web.service.CommonService, ApplicationContextAware, ServletContextAware {

    private static final Logger log = Logger.getLogger(CommonServiceImpl.class);
    private Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

    private ApplicationContext ctx;
    private ServletContext servletContext;
    private CommonDao commonDao;
    private CodeData codeData;

    private SqlSessionFactory sqlSessionFactory;

    // -------------------------------------------------------------------------
    // Operation methods, implementing the Facade interface
    // -------------------------------------------------------------------------

    /**
     * Meta 데이터 카운트 조회 (공통)
     *
     * @param sqlId  sql id
     * @param params 바인딩 파라미터
     * @return
     */
    @Override
    public int getDataCount(String sqlId, Map params) throws DataAccessException {
        return commonDao.getDataCount(sqlId, params);
    }

    /**
     * Meta 데이터 목록 조회 (공통)
     *
     * @param sqlId  sql id
     * @param params 바인딩 파라미터
     * @return
     */
    @Override
    public List getDataList(String sqlId, Map params) throws DataAccessException {
    	System.out.println(">>>> getDataList ");
    	System.out.println(sqlId);
    	
        return commonDao.getDataList(sqlId, params);
    }

    /**
     * Meta 데이터 단건 조회 (공통)
     *
     * @param sqlId  sql id
     * @param params 바인딩 파라미터
     * @return
     */
    @Override
    public Object getData(String sqlId, Map params) throws DataAccessException {
        System.out.println(commonDao);

        return commonDao.getData(sqlId, params);
    }

    /**
     * 쿼리 실행
     *
     * @param query 수행쿼리
     * @param limit 가져올 최대 레코드 수
     */
    @Override
    public List getQueryData(String query, int limit) throws DataAccessException {
        if (limit <= 0) {
            limit = 100;
        }
        return commonDao.getQueryData(query, limit);
    }

    /**
     * Meta 데이터 인서트 - 공통
     *
     * @param sqlId  sql id
     * @param params 파라미터 값
     * @return insert시에 사용된 select key 값을 반환한다. 없으면 null이다.
     */
    @Override
    public Object insert(String sqlId, Map params) throws DataAccessException {
        return commonDao.insert(sqlId, params);
    }

    /**
     * Meta 데이터 업데이트 - 공통
     *
     * @param sqlId  sql id
     * @param params 파라미터 값
     * @return 업데이트 된 로우 수
     * @throws DataAccessException
     */
    @Override
    public int update(String sqlId, Map params) throws DataAccessException {
        return commonDao.update(sqlId, params);
    }

    /**
     * Meta 데이터 삭제 - 공통
     *
     * @param sqlId  sql id
     * @param params 파라미터 값
     * @return 삭제된 로우 수
     * @throws DataAccessException
     */
    @Override
    public int delete(String sqlId, Map params) throws DataAccessException {
        return commonDao.delete(sqlId, params);
    }

    /**
     * 쿼리툴 용 메소드
     */
    @Override
    public List execGetQueryToolResult(HashMap params) throws DataAccessException {
        return commonDao.getQueryData((String) params.get("query"), Integer.parseInt((String) params.get("limit")));
    }

    @Override
    public Map execGetAllCodeData(HashMap params) throws DataAccessException {
        return codeData.getAllCodeData();
    }

    // -------------------------------------------------------------------------
    // Setter methods for dependency injection
    // -------------------------------------------------------------------------


    @Override
    public void setApplicationContext(ApplicationContext ctx)
            throws BeansException {
        this.ctx = ctx;
    }

    @Override
    public void setServletContext(ServletContext arg0) {
        this.servletContext = arg0;
    }


    public void setCodeData(CodeData codeData) {
        this.codeData = codeData;
    }

    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

	public void setCommonDao(CommonDao commonDao) {
		this.commonDao = commonDao;
	}
    
    
}