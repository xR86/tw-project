/*Table cleanup*/
DROP TABLE Persons CASCADE CONSTRAINTS
/
DROP TABLE Tasks CASCADE CONSTRAINTS
/
DROP TABLE SolvedTasks CASCADE CONSTRAINTS
/
 
 
 
 
/*
* Persons table
* uniquely identifies any person from the FreeCodeCamp database
* should probably add other data ?
*/
CREATE TABLE Persons(
  p_id NUMBER(6) NOT NULL,
  tasks_attempted_counter NUMBER(4) NOT NULL,
  tasks_completed_counter NUMBER(4) NOT NULL/*,
 
  CONSTRAINT p_id_pk PRIMARY KEY (p_id)*/
)
/
 
/*
* Tasks table
* used for task list -> so as to reduce memory needed for each task id
*/
CREATE TABLE Tasks(
  task_id NUMBER(3) NOT NULL,
  task_name VARCHAR2(100) NOT NULL/*,
 
  CONSTRAINT task_id_pk PRIMARY KEY (task_id)*/
)
/
 
/*
* SolvedTasks table
* used for storing the tasks as solved by FreeCodeCamp users
* a user should have more than 1 task
*/
CREATE TABLE SolvedTasks(
  st_id NUMBER(20) NOT NULL,/*numar mare de taskuri rezolvate,
   poate ar trebui un cod alfanumeric ?*/
  p_id NUMBER(6) NOT NULL, /**/
  task_id NUMBER(3) NOT NULL,
 
  completedDate TIMESTAMP,
  hasSolution CHAR(1),
  solution CLOB/*,
 
  CONSTRAINT st_id_pk PRIMARY KEY (st_id)
 
  CONSTRAINT p_id_FK
      FOREIGN KEY (p_id)
    REFERENCES Persons(p_id),
 
  CONSTRAINT task_id_FK
      FOREIGN KEY (task_id)
    REFERENCES Tasks(task_id)*/
)
/
 
 
 
 
 
/*
* solvedTasksView
* used to aggregate solved tasks (implied - that have a solution)
*
*/
DROP VIEW solvedTasksView;
/
 
CREATE VIEW solvedTasksView as
  SELECT s.p_id,s.st_id,s.task_id, t.task_name, s.completedDate, s.hasSolution, s.solution
  FROM SolvedTasks s
    JOIN Tasks t ON s.task_id = t.task_ID
  WHERE hasSolution IS NOT NULL
;
/

  
 
drop sequence task_id_seq;
/
CREATE SEQUENCE TASK_ID_SEQ;
/
drop sequence st_id_seq;
/
create sequence st_id_seq;
/

/**************
UPDATE SOLVEDTASKS SET HASSOLUTION='N' WHERE SOLUTION IS NULL;
/
UPDATE SOLVEDTASKS SET HASSOLUTION='Y' WHERE SOLUTION IS NOT NULL;
/
update persons p set 
      TASKS_ATTEMPTED_COUNTER=(
              select count(*) from solvedtasks st where p.p_id=st.p_id),
      TASKS_COMPLETED_COUNTER=(
              select count(*) from solvedtasks st where p.p_id=st.p_id AND HASSOLUTION='Y');
/
COMMIT;
/
***************/