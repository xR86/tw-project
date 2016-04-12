DROP TABLE FreeCodeCamp;
CREATE TABLE FreeCodeCamp(
  person_id NUMBER,
  task_id NUMBER,
  task_name VARCHAR2(100),
  task_completedDate TIMESTAMP,
  task_solution CLOB
);

CREATE OR REPLACE FUNCTION unix_ts_to_date( p_unix_ts IN NUMBER )
  RETURN DATE
IS
  l_date DATE;
  BEGIN
    l_date := date '1970-01-01' + p_unix_ts/60/60/24;
    RETURN l_date;
  END;

TRUNCATE TABLE FreeCodeCamp;

SELECT * FROM FreeCodeCamp;
select distinct task_name from FreeCodeCamp;


--INSERT INTO FreeCodeCamp VALUES(1,1,'TASK',TO_TIMESTAMP(unix_ts_to_date(1442340528),'YYYY-MM-DD HH24:MI:SS'),'SOLUTIE');



SELECT unix_ts_to_date(1442340528) FROM DUAL;

select unix_ts_to_date(1438207125) FROM DUAL;




