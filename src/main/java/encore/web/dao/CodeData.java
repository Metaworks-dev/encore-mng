package encore.web.dao;

import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 공통코드
 * @author hkx200
 *
 */
public class CodeData {

    private static final Logger log = Logger.getLogger(CodeData.class);
    private CommonDao commonDao;
    private Map codeData;

    /**
     * 코드 데이터 초기화
     */
    public void init() {
        if (log.isInfoEnabled()) {
            log.info("Metaworks CodeData Load..");
        }

        codeData = new HashMap();
        List codeAllList = commonDao.getDataList("common.getCodeList", null);
        List parCdlist = findByUpcd(codeAllList, "000");
        codeData.put("000", parCdlist);

        for (int i = 0; i < parCdlist.size(); i++) {
            Map data = (Map) parCdlist.get(i);
            List list = findByUpcd(codeAllList, (String) data.get("CD"));
            codeData.put((String) data.get("CD"), list);
        }
    }

    /**
     * 모든 코드 목록을 반환한다.
     *
     * @return codeData
     */
    public Map getAllCodeData() {
        if (codeData == null) {
            init();
        }
        return codeData;
    }

    /**
     * 상위코드를 입력받아 코드 리스트를 반환한다.
     * @param parCd	상위코드번호
     * @return			코드 목록
     */
    public List get(String parCd) {
        if (parCd == null || parCd.equals("")) {
            return null;
        }

        if (codeData == null) {
            init();
        }

        return (List) codeData.get(parCd);
    }

    /**
     * 상위코드번호와 코드번호를 받아 코드명을 리턴한다.
     *
     * @param parCd 상위코드번호
     * @param cd 코드번호
     * @return cdNm	코드명
     */
    public String get(String parCd, String cd) {
        if (parCd == null || parCd.equals("")) {
            return null;
        }

        String cdNm = null;

        if (codeData == null) {
            init();
        }

        List codeList = (List)codeData.get(parCd);
        for(int i = 0 ; i < codeList.size() ; i++) {
            Map data = (Map) codeList.get(i);

            if (data.get("CD").equals(cd)) {
                cdNm = data.get("CD_VAL").toString();
            }
        }

        return cdNm;
    }

    /**
     * 코드 리스트 중에 상위코드값에 해당하는 리스트를 반환한다.
     *
     * @param codeList		코드 리스트
     * @param parCd		상위코드값
     * @return list			상위코드목록
     */
    private List findByUpcd(List codeList, String parCd) {
        List list = new ArrayList();
        for (int i = 0; i < codeList.size(); i++) {
            Map data = (Map) codeList.get(i);
            String tmp = (String) data.get("PAR_CD");
            if (tmp.equals(parCd)) {
                list.add(data);
            }
        }
        return list;
    }

    // -------------------------------------------------------------------------
    // Setter methods for dependency injection
    // -------------------------------------------------------------------------
    public void setCommonDao(CommonDao commonDao) {
        this.commonDao = commonDao;
    }
}
