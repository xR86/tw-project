/*
* README
* Script used for initializing the database.
*
*/


/*Table cleanup*/
DROP TABLE Persons CASCADE CONSTRAINTS
/
DROP TABLE Tasks CASCADE CONSTRAINTS
/
DROP TABLE SolvedTasks CASCADE CONSTRAINTS
/
DROP TABLE SiteUsers CASCADE CONSTRAINTS
/


ACCEPT  dmy  PROMPT "create tables/Press [Enter] to continue ...";

/*
* Persons table
* uniquely identifies any person from the FreeCodeCamp database
* should probably add other data ?
*/
CREATE TABLE Persons(
  p_id NUMBER(6) NOT NULL,
  tasks_attempted_counter NUMBER(4) NOT NULL,
  tasks_completed_counter NUMBER(4) NOT NULL,

  CONSTRAINT p_id_pk PRIMARY KEY (p_id)
)
/

/*
* Tasks table
* used for task list -> so as to reduce memory needed for each task id
*/
CREATE TABLE Tasks(
	task_id NUMBER(3) NOT NULL,
	task_name VARCHAR2(30) NOT NULL,

	CONSTRAINT task_id_pk PRIMARY KEY (task_id)
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
	
	completedDate DATE,
	hasSolution CHAR(1) NOT NULL,
	solution CLOB,

 	CONSTRAINT p_id_FK
    	FOREIGN KEY (p_id)
    REFERENCES Persons(p_id),

 	CONSTRAINT task_id_FK
    	FOREIGN KEY (task_id)
    REFERENCES Tasks(task_id)
)
/


/*
* Users table  
* used for the users that have an account on our site
*/
CREATE TABLE SiteUsers(
	user_id NUMBER(5) NOT NULL,
	user_firstname VARCHAR2(30) NOT NULL,
	user_lastname VARCHAR2(30) NOT NULL,

	user_email VARCHAR2(30) NOT NULL,/*indexare aici ... 2 usecases: logare si recuperare parola*/
	user_password VARCHAR2(40) NOT NULL, /*hashed*/
	user_salt VARCHAR2(40) NOT NULL, /*hash for password*/

	CONSTRAINT user_id_pk PRIMARY KEY (user_id),
	CONSTRAINT user_email_un UNIQUE (user_email)
)
/

/*
	Tasks - are task_id si task_name
	ar mai trebui adaugate campuri precum:
		counterUsersCompleted NUMBER,
		counterUsersAttempted NUMBER,
		percentUsersCompleted NUMBER,

*/
/*
	Statistici globale
*/
CREATE TABLE AllUsersStats(
	/*trebuie PK aici ?*/
	/*gandeste-te aici*/

)
/

/*
	Statistici relative la o persoana
*/
CREATE TABLE PersonStats(
	p_id NUMBER(6) NOT NULL,
	/*mai trebuie PK aici ?*/

	percentCompletedTasks NUMBER, /*counterCompleted/counterTotal*/
	counterCompletedTasks NUMBER, /*count ...*/
	counterTotalTasks NUMBER, /*count ...*/

	avgLinesPerSolution NUMBER, /*? count(lines)/count(linesTotal) - poti numara liniile pentru clobul solutie ?*/
	biggestStreakDays NUMBER, /*biggest day streak for that person*/
	biggestStreakTasks NUMBER, /*biggest streak for tasks in 1 day*/

	CONSTRAINT p_id_FK
    	FOREIGN KEY (p_id)
    REFERENCES Persons(p_id),
)
/

ACCEPT  dmy  PROMPT "create views/Press [Enter] to continue ...";

/*
* solvedTasksView
* used to aggregate solved tasks (implied - that have a solution)
* 
*/
DROP VIEW solvedTasksView;
/

CREATE VIEW solvedTasksView as
	SELECT t.task_name, s.completedDate, s.hasSolution, s.solution
	FROM SolvedTasks s
		JOIN Tasks t ON s.task_id = t.task_ID
	WHERE hasSolution IS NOT NULL 
;



