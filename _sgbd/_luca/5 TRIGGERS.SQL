CREATE OR REPLACE TRIGGER p_task_count
AFTER INSERT OR UPDATE OR DELETE ON SolvedTasks
FOR EACH ROW
BEGIN
      CASE
        WHEN INSERTING THEN
          UPDATE PERSONS SET tasks_attempted_counter=tasks_attempted_counter+1 WHERE P_ID=:NEW.P_ID;
          IF (:NEW.hasSolution='Y') THEN
            UPDATE PERSONS SET tasks_completed_counter=tasks_completed_counter+1 WHERE P_ID=:NEW.P_ID;
          END IF;
        WHEN UPDATING THEN
          IF (:OLD.hasSolution='Y' AND :NEW.hasSolution='N') THEN
            UPDATE PERSONS SET tasks_completed_counter=tasks_completed_counter-1 WHERE P_ID=:NEW.P_ID;
          ELSIF (:OLD.hasSolution='N' AND :NEW.hasSolution='Y') THEN
            UPDATE PERSONS SET tasks_completed_counter=tasks_completed_counter+1 WHERE P_ID=:NEW.P_ID;
          END IF; 
        WHEN DELETING THEN
          UPDATE PERSONS SET tasks_completed_counter=tasks_completed_counter-1 WHERE P_ID=:NEW.P_ID;
          IF (:OLD.hasSolution='Y') THEN
            UPDATE PERSONS SET tasks_completed_counter=tasks_completed_counter-1 WHERE P_ID=:NEW.P_ID;
          END IF;
      END CASE;
END;
          
   
   
CREATE OR REPLACE TRIGGER task_has_solution
BEFORE INSERT OR UPDATE ON SolvedTasks
FOR EACH ROW
   BEGIN   
      CASE
        WHEN :NEW.solution IS NULL THEN
          :NEW.hasSolution:='N';
        WHEN :NEW.solution IS NOT NULL THEN
          :NEW.hasSolution:='Y';
      END CASE;
   END; 
   
   
   
   COMMIT;
