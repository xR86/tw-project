CREATE OR REPLACE FUNCTION personsCount RETURN VARCHAR2 AS
  result number;
BEGIN
  SELECT COUNT(*) INTO result FROM PERSONS;
  RETURN result;
END;
/

CREATE OR REPLACE FUNCTION solvedTasksCount RETURN VARCHAR2 AS
  result number;
BEGIN
  SELECT COUNT(*) INTO result FROM SOLVEDTASKS;
  RETURN result;
END;
/

CREATE OR REPLACE FUNCTION tasksCount RETURN VARCHAR2 AS
  result number;
BEGIN
  SELECT COUNT(*) INTO result FROM TASKS;
  RETURN result;
END;
/

CREATE OR REPLACE FUNCTION siteUsersCount RETURN VARCHAR2 AS
  result number;
BEGIN
  SELECT COUNT(*) INTO result FROM SITEUSERS;
  RETURN result;
END;
/
/*
set serveroutput on;
DECLARE
  ret NUMBER;
BEGIN
  ret := FreeCodeCamp.taskCompletionRate_task(139);-- FROM DUAL;
  DBMS_OUTPUT.PUT_LINE(ret);
END;
/*/
