CREATE TABLE `TB_EMP` (
                          `EMP_ID` int(11) NOT NULL COMMENT '직원ID',
                          `EMAIL` varchar(60) NOT NULL COMMENT '이메일',
                          `PASSWD` varchar(50) NOT NULL COMMENT '비밀번호',
                          `EMP_NM` varchar(50) NOT NULL COMMENT '직원명',
                          `EMP_NO` varchar(4) NOT NULL COMMENT '사번',
                          `MNG_LVL` varchar(15) NOT NULL DEFAULT 'user' COMMENT '관리등급',
                          `REG_DTM` datetime NOT NULL COMMENT '등록일시',
                          `MOD_DTM` datetime NOT NULL COMMENT '수정일시',
                          PRIMARY KEY (`EMP_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8
;


CREATE TABLE `TB_PROJ`
(
    `PROJ_ID`	 INT   NOT NULL COMMENT '프로젝트ID',
    `PROJ_NM`	 VARCHAR(200)    NOT NULL COMMENT '프로젝트명',
    `PROJ_START_DT`	 VARCHAR(8)   COMMENT '프로젝트시작일자',
    `PROJ_END_DT`	 VARCHAR(8)   COMMENT '프로젝트종료일자',
    `PROJ_EMP_CNT`	 INT COMMENT '프로젝트직원수',
    `REG_DTM`	 DATE  COMMENT '등록일시',
    `MOD_DTM`	 DATE COMMENT '수정일시'
);


ALTER TABLE `TB_PROJ`
    ADD CONSTRAINT TB_PROJ_PK PRIMARY KEY ( `PROJ_ID` );

CREATE INDEX TB_PROJ_IDX01 ON TB_PROJ (PROJ_NM);

