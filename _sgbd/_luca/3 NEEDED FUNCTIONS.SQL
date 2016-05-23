create or replace function TaskExists(pin_taskName IN VARCHAR2)
RETURN NUMBER is
v_task_exists NUMBER;
begin
  SELECT COUNT(*) INTO v_task_exists FROM TASKS WHERE 
         EXISTS(SELECT * FROM TASKS WHERE task_name=pin_taskName)
         ;
  RETURN v_task_exists;
  
end TaskExists;




create or replace function unix_to_timestamp(pin_unix IN NUMBER)
RETURN TIMESTAMP IS
       l_date DATE;

BEGIN
  l_date := date '1970-01-01' + pin_unix/60/60/24/1000;
  RETURN l_date;
END unix_to_timestamp;
