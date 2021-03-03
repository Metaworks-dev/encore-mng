package encore.web.service;

import org.springframework.dao.DataAccessException;

import java.util.HashMap;
import java.util.Map;

public interface ProjWorkService {
    Map txUpsertProjWork(HashMap params) throws DataAccessException;
}
