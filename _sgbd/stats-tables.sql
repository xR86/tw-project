CREATE TABLE MONTHLY_TASKS
(MON NUMBER(2),
TASK_COUNT NUMBER);

DROP TABLE MONTHLY_TASKS;

declare
 v_temp NUMBER;

begin
 FOR i IN 1..12
 LOOP
   --select count(*) INTO v_temp from solvedtasks where extract(month from completeddate)=i;
   select count(*) INTO v_temp from solvedtasks where extract(month from completeddate)=i AND hasSolution='Y';
   EXECUTE IMMEDIATE 'INSERT INTO MONTHLY_TASKS VALUES (' || i || ',' || v_temp ||')';
 END LOOP;
end;
/

--select * from monthly_tasks;
