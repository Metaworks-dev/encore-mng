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


CREATE TABLE `TB_PROJ` (
                           `PROJ_ID` int(11) AUTO_INCREMENT NOT NULL COMMENT '프로젝트ID',
                           `PROJ_NM` varchar(200) NOT NULL COMMENT '프로젝트명',
                           `PROJ_STAT_CD` varchar(20) NOT NULL DEFAULT 'standby',
                           `PROJ_START_DT` varchar(10) DEFAULT NULL COMMENT '프로젝트시작일자',
                           `PROJ_END_DT` varchar(10) DEFAULT NULL COMMENT '프로젝트종료일자',
                           `PROJ_EMP_CNT` int(11) DEFAULT NULL COMMENT '프로젝트직원수',
                           `REG_DTM` date DEFAULT NULL COMMENT '등록일시',
                           `MOD_DTM` date DEFAULT NULL COMMENT '수정일시',
                           PRIMARY KEY (`PROJ_ID`),
                           KEY `TB_PROJ_IDX01` (`PROJ_NM`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8

CREATE TABLE `TB_PROJ_EMP` (
                               `PROJ_ID` int(11) NOT NULL COMMENT '프로젝트ID',
                               `EMP_ID` int(11) NOT NULL COMMENT '직원ID',
                               `PROJ_ROLE` varchar(20) DEFAULT NULL COMMENT '프로젝트역할',
                               `EMP_PROJ_START_DT` varchar(10) DEFAULT NULL COMMENT '직원프로젝트시작일자',
                               `EMP_PROJ_END_DT` varchar(10) DEFAULT NULL COMMENT '직원프로젝트종료일자',
                               `EMP_PROJ_APRX_END_DT` varchar(10) DEFAULT NULL COMMENT '직원프로젝트종료예상일자',
                               `EMP_POSITION` varchar(20) DEFAULT NULL COMMENT '투입직급',
                               `EMP_PRICE` int(11) DEFAULT NULL COMMENT '투입단가',
                               PRIMARY KEY (`PROJ_ID`,`EMP_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8


;


truncate table TB_CALENDAR ;

insert into TB_CALENDAR
select yyyy_mm, concat(yyyy_mm, '-', LPAD(b.no, 2, '0')) yyyy_mm_dd
     ,LPAD(b.no, 2, '0') dd
     ,dayofweek(str_to_date(concat(yyyy_mm, '-', LPAD(b.no, 2, '0')), '%Y-%m-%d')) week_day
     ,case when dayofweek(str_to_date(concat(yyyy_mm, '-', LPAD(b.no, 2, '0')), '%Y-%m-%d')) in (7, 1) then 1 else 0 end holiday_yn
     ,null holiday_nm
from (
         SELECT concat(date_format(now(), '%Y'), '-', LPAD(A.NO, 2, '0')) yyyy_mm
              ,date_Format(last_day(str_to_date(concat(date_format(now(), '%Y'), '-', LPAD(A.NO, 2, '0')), '%Y-%m-%d')), '%d') dt_cnt
         FROM COPY_T A
         WHERE A.NO <= 12
     ) a
         cross join COPY_T b on a.dt_cnt >= b.no
order by 1, 2

