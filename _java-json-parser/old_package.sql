create or replace package FreeCodeCamp is
  
  --returns a completion percentage for a given person in a period of time
  function taskCompletionRate_person(pin_Start_Date IN DATE, pin_End_Date IN DATE, pin_p_id NUMBER) return number;
   
  --returns a completion percentage for a given task id 
  function taskCompletionRate_task(pin_task_id NUMBER) return number;
  
  --returns a person's id that has the task_id given in the parameter completed
  function FETCH_RANDOM_PERSON (PIN_TASK_ID IN NUMBER) return number;
  
  --checks with an exists condition if the task name exists
  --will return != 0 if found
  function TaskExists(pin_taskName IN VARCHAR2) return number;
  
  
  --converts the unix time format found in the json to standart timestamp format
  function unix_to_timestamp(pin_unix IN NUMBER) return TIMESTAMP;
  
  --finds the maximum one-day-streak completed tasks
  function longestOneDayStreak(person_id NUMBER) return number;
end FreeCodeCamp;
/




create or replace package body FreeCodeCamp is
  ---------------------------------------------------------     
  function taskCompletionRate_person(pin_Start_Date IN DATE, pin_End_Date IN DATE, pin_p_id NUMBER) 
  return number is
    v_tasks_count NUMBER;
    v_completed_tasks_count NUMBER;
  begin
    SELECT COUNT(*) INTO v_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') BETWEEN pin_Start_Date AND pin_End_Date AND p_id=pin_p_id;
    SELECT COUNT(*) INTO v_completed_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') BETWEEN pin_Start_Date AND pin_End_Date AND hasSolution='Y' AND p_id=pin_p_id;
    IF (v_tasks_count=0) THEN
      return 0;
    ELSE
      return ROUND(v_completed_tasks_count/v_tasks_count*100,2);
    END IF;
  end taskCompletionRate_person;
  
  ---------------------------------------------------------
  ---------------------------------------------------------
  
  function taskCompletionRate_task(pin_task_id NUMBER)
  return number is
    v_tasks_count NUMBER;
    v_completed_tasks_count NUMBER;
    
    task_inexistent EXCEPTION;
    PRAGMA EXCEPTION_INIT(task_inexistent, -20001);
    v_found NUMBER;
  begin
    SELECT 1 INTO v_found FROM TASKS WHERE TASK_ID=pin_task_id;
    SELECT COUNT(*) INTO v_tasks_count FROM SolvedTasks WHERE task_id=pin_task_id;
    SELECT COUNT(*) INTO v_completed_tasks_count FROM SolvedTasks WHERE hasSolution='Y' AND task_id=pin_task_id;
    IF (v_tasks_count=0) THEN
      return 0;
    ELSE
      return ROUND(v_completed_tasks_count/v_tasks_count*100,2);
    END IF;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      raise_application_error (-20001,'Task id-ul nu a fost gasit in baza de date');
  end taskCompletionRate_task;
  
  ---------------------------------------------------------
  ---------------------------------------------------------
  
  function FETCH_RANDOM_PERSON (PIN_TASK_ID IN NUMBER)
  return NUMBER is
    v_total_rows NUMBER;
    return_id NUMBER;
    v_random NUMBER;
  begin
    SELECT COUNT(ST_ID) INTO v_total_rows FROM SOLVEDTASKS WHERE TASK_ID=PIN_TASK_ID
           AND HASSOLUTION='Y';
    v_random := FLOOR(DBMS_RANDOM.VALUE(1,v_total_rows));
    SELECT P_ID INTO return_id FROM 
           (SELECT P_ID,ROWNUM AS RN FROM SOLVEDTASKS WHERE TASK_ID=PIN_TASK_ID
                   AND HASSOLUTION='Y')
           WHERE RN=v_random;
    RETURN return_id;
    
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        RETURN -1;
  end FETCH_RANDOM_PERSON;
  
  ---------------------------------------------------------
  ---------------------------------------------------------
  
  function TaskExists(pin_taskName IN VARCHAR2)
  RETURN NUMBER is
  v_task_exists NUMBER;
  begin
    SELECT COUNT(*) INTO v_task_exists FROM TASKS WHERE
           EXISTS(SELECT * FROM TASKS WHERE task_name=pin_taskName)
           ;
    RETURN v_task_exists;

  end TaskExists;
  
  ---------------------------------------------------------
  ---------------------------------------------------------
  
  function unix_to_timestamp(pin_unix IN NUMBER)
  RETURN TIMESTAMP IS
         l_date DATE;

  BEGIN
    l_date := date '1970-01-01' + pin_unix/60/60/24/1000;
    RETURN l_date;
  END unix_to_timestamp;
  
  ---------------------------------------------------------
  ---------------------------------------------------------
  
  function longestOneDayStreak(person_id NUMBER)
  RETURN number AS
  streak number;
    begin
      SELECT MAX(COUNT(*)) into streak  FROM SOLVEDTASKS
      WHERE P_ID=person_id AND HASSOLUTION='Y'
      GROUP BY TO_CHAR(COMPLETEDDATE,'DD-MM-YY'),P_ID;
      RETURN streak;
    end longestOneDayStreak;
end FreeCodeCamp;
