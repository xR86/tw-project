CREATE OR REPLACE  procedure taskCompletionRate(pin_completedDate IN DATE) is
    v_tasks_count NUMBER;
    v_completed_tasks_count NUMBER;
  begin
    SELECT COUNT(*) INTO v_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY')=pin_completedDate;
    SELECT COUNT(*) INTO v_completed_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY')=pin_completedDate AND hasSolution='Y';
    IF (v_tasks_count=0) THEN
      DBMS_OUTPUT.PUT_LINE('0%');
    ELSE
      DBMS_OUTPUT.PUT_LINE(ROUND(v_completed_tasks_count/v_tasks_count*100,2) || '%');
    END IF;
  end taskCompletionRate;
  
  

CREATE OR REPLACE  procedure taskCompletionRate(pin_Start_Date IN DATE, pin_End_Date IN DATE) is
    v_tasks_count NUMBER;
    v_completed_tasks_count NUMBER;
  begin
    SELECT COUNT(*) INTO v_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') BETWEEN pin_Start_Date AND pin_End_Date;
    SELECT COUNT(*) INTO v_completed_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') BETWEEN pin_Start_Date AND pin_End_Date AND hasSolution='Y';
    IF (v_tasks_count=0) THEN
      DBMS_OUTPUT.PUT_LINE('0%');
    ELSE
      DBMS_OUTPUT.PUT_LINE(ROUND(v_completed_tasks_count/v_tasks_count*100,2) || '%');
    END IF;
  end taskCompletionRate;
  
  
CREATE OR REPLACE  procedure taskCompletionRate(pin_completedDate IN DATE, pin_p_id NUMBER) is
    v_tasks_count NUMBER;
    v_completed_tasks_count NUMBER;
  begin
    SELECT COUNT(*) INTO v_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY')=pin_completedDate AND p_id=pin_p_id;
    SELECT COUNT(*) INTO v_completed_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY')=pin_completedDate AND hasSolution='Y' AND p_id=pin_p_id;
    IF (v_tasks_count=0) THEN
      DBMS_OUTPUT.PUT_LINE('0%');
    ELSE
      DBMS_OUTPUT.PUT_LINE(ROUND(v_completed_tasks_count/v_tasks_count*100,2) || '%');
    END IF;
  end taskCompletionRate;
  
  
  CREATE OR REPLACE  procedure taskCompletionRate(pin_Start_Date IN DATE, pin_End_Date IN DATE, pin_p_id NUMBER) is
    v_tasks_count NUMBER;
    v_completed_tasks_count NUMBER;
  begin
    SELECT COUNT(*) INTO v_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') BETWEEN pin_Start_Date AND pin_End_Date AND p_id=pin_p_id;
    SELECT COUNT(*) INTO v_completed_tasks_count FROM SolvedTasks WHERE TO_DATE(TO_CHAR(completedDate,'DD-MM-YYYY'),'DD-MM-YYYY') BETWEEN pin_Start_Date AND pin_End_Date AND hasSolution='Y' AND p_id=pin_p_id;
    IF (v_tasks_count=0) THEN
      DBMS_OUTPUT.PUT_LINE('0%');
    ELSE
      DBMS_OUTPUT.PUT_LINE(ROUND(v_completed_tasks_count/v_tasks_count*100,2) || '%');
    END IF;
  end taskCompletionRate;