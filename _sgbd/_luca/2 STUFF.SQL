SELECT TaskExists('Waypoint: Learn how Free Code Camp Works') FROM DUAL


drop table persons

INSERT INTO TASKS VALUES(2,'Waypoint: Learn how Free Code Camp Works')

drop sequence task_id_seq;
/
CREATE SEQUENCE TASK_ID_SEQ;
/
drop sequence st_id_seq;
/
create sequence st_id_seq;
/
commit;
/

select solution from solvedtasks where p_id=20
SELECT P_ID || ' ' FROM PERSONS
select * from persons
select * from tasks
select * from SolvedTasks
select * from SolvedTasksView

INSERT INTO SOLVEDTASKS VALUES(ST_ID_SEQ.NEXTVAL,1,1,unix_to_timestamp(1434650566196),NULL,'CEAV');
TRUNCATE TABLE SOLVEDTASKS
truncate table tasks

select unix_to_timestamp(1434650566196) from dual;

BEGIN
  taskCompletionRate(TO_DATE('15-SEP-2015','DD-MM-YYYY'));
END;


BEGIN
  taskCompletionRate(TO_DATE('15-SEP-2015','DD-MM-YYYY'),TO_DATE('15-SEP-2016','DD-MM-YYYY'));
END;


select * from SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') = TO_DATE('15-SEP-2015','DD-MM-YYYY')

SELECT TO_DATE(TO_CHAR(COMPLETEDDATE,'DD-MM-YYYY'),'DD-MM-YYYY') FROM SOLVEDTASKS


BEGIN
  taskCompletionRate(TO_DATE('15-MAR-2015','DD-MM-YYYY'),TO_DATE('15-SEP-2015','DD-MM-YYYY'),2);
END;

SELECT *
  FROM ( SELECT *
           FROM PERSONS
          WHERE P_ID <= 50
            
          ORDER BY P_ID DESC
       )
 WHERE rownum <= 10
 
 
 select count(*) from solvedtasks
