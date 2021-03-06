package org.java_json_parser.OracleDBConnection;
import java.sql.*;
/**
 * Connection to the Oracle Database.
 * For each task the insert_query procedure shall be called, communicating with the database.
 */
public class DBConnect {
    private String user;
    private String pass;
    private Connection conn;
    public DBConnect(String user, String pass){
        this.user=user;
        this.pass=pass;
    }
    public void connect() throws SQLException {
        this.conn = DriverManager.getConnection("jdbc:oracle:thin:@//localhost:1521/orcl", user, pass); //change data here
    }
    public void disconnect() throws SQLException{
        this.conn.close();
    }
    public void insert_query(String taskName, long date, String solution, boolean personIsInserted) throws SQLException {
        PreparedStatement ps;
        try {
            /**
             * Inserting the contestants in the table
             * If the contestant is already inserted we have a trigger iterating attempted and completed tasks
             */
            /*if (personIsInserted==true) {
                if (solution != null) {//the person was already inserted
                    persoaneTable = "UPDATE PERSONS " +
                            "SET tasks_attempted_counter=tasks_attempted_counter+1," +
                            "tasks_completed_counter=tasks_completed_counter+1 " +
                            "WHERE p_id=?";
                }
                else {
                    persoaneTable = "UPDATE PERSONS " +
                            "SET tasks_attempted_counter=tasks_attempted_counter+1" +
                            "WHERE p_id=?";
                }
            }*/
            String persoaneTable;
            if (!personIsInserted) {//insert new person
                persoaneTable = "INSERT INTO PERSONS VALUES(PERSON_ID_SEQ.NEXTVAL,0,0)";
                ps = conn.prepareStatement(persoaneTable);
                ps.execute();
                ps.close();
            }
            /**
             * Inserting tasks in it's table
             * If a task is found in the table then the statement will be ignored
             */
            if (taskName!=null) {
                String checkForTask = "SELECT FreeCodeCamp.TaskExists(?) AS result FROM DUAL";
                ps = conn.prepareStatement(checkForTask);
                ps.setString(1, taskName);
                ResultSet rs = ps.executeQuery();
                rs.next();
                int result = rs.getInt("result");
                if (result == 0) {
                    String insertTaks = "INSERT INTO TASKS VALUES(TASK_ID_SEQ.NEXTVAL,?)";
                    PreparedStatement ps2 = conn.prepareStatement(insertTaks);
                    ps2.setString(1, taskName);
                    ps2.execute();
                    ps2.close();
                }
                rs.close();
                ps.close();
            }
            /**
             * Before inserting each task for a person
             * We need to fetch the task name corresponding to the task id inserted earlier
             */
            ResultSet rs2;
            ps=conn.prepareStatement("SELECT task_id AS result FROM TASKS WHERE TASK_NAME=?");
            ps.setString(1,taskName);
            rs2=ps.executeQuery();
            int task_id=0;
            while(rs2.next())
                task_id=rs2.getInt("result");
            rs2.close();
            ps.close();
            /**
             * Inserting for each person it's task
             * and checking if it's completed or not
             */
            if (task_id!=0) {
                String insert_task;
                if (solution == null) {
                    insert_task = "INSERT INTO SOLVEDTASKS VALUES(ST_ID_SEQ.NEXTVAL,PERSON_ID_SEQ.CURRVAL,?,FreeCodeCamp.unix_to_timestamp(?),'N',NULL)";
                    ps = conn.prepareStatement(insert_task);
                    ps.setInt(1, task_id);
                    ps.setLong(2, date);
                } else {
                    insert_task = "INSERT INTO SOLVEDTASKS VALUES(ST_ID_SEQ.NEXTVAL,PERSON_ID_SEQ.CURRVAL,?,FreeCodeCamp.unix_to_timestamp(?),'Y',?)";
                    ps = conn.prepareStatement(insert_task);
                    ps.setInt(1, task_id);
                    ps.setLong(2, date);
                    ps.setString(3, solution);
                }
                ps.execute();
                ps.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    } //insert_query end
}