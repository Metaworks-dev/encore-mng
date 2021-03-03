package encore.web.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import encore.web.dao.CommonDao;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.dao.DataAccessException;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.Map;

public class ProjWorkServiceImpl implements ProjWorkService, ApplicationContextAware, ServletContextAware {

    private static final Logger log = Logger.getLogger(CommonServiceImpl.class);
    private Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

    private ApplicationContext ctx;
    private ServletContext servletContext;
    private CommonDao commonDao;
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public Map txUpsertProjWork(HashMap params) throws DataAccessException {
        System.out.println("txUpsertProjWork");
        commonDao.insert("projwork.insertProjWork", params);
        return null;
    }

    // -------------------------------------------------------------------------
    // Setter methods for dependency injection
    // -------------------------------------------------------------------------
    public void setCommonDao(CommonDao commonDao) {
        this.commonDao = commonDao;
    }

    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        this.ctx = ctx;
    }

    @Override
    public void setServletContext(ServletContext arg0) {
        this.servletContext = arg0;
    }

    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }
}
