package org.java_json_parser;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.java_json_parser.ObjectStructure.Tasks;
import org.java_json_parser.OracleDBConnection.DBConnect;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.sql.SQLException;
import java.util.List;
/**
 * Reads a list of contestants
 * each having his own nb of tasks
 * (also contained in a list for each person)
 *
 * ex: [
 *       person1
 *          [
 *              {task1},
 *              {task2},
 *              etc..
 *          ],
 *       person2
 *          [
 *              {task1},
 *              {task2},
 *              etc..
 *          ],
 *       ...
 *     ]
 */
public class MainParser {
    public static void main(String[] args) {
        Boolean personIsInserted=false;
        //Date time;
        //DBConnect connection = new DBConnect("tw_admin","pass");
        DBConnect connection = new DBConnect("TW_PROJ","TW_PROJ");
        try {
            BufferedReader br = new BufferedReader(
                    new FileReader("D:\\try\\test.json")); //destination to json here
                    // "E:\\github\\tw-project\\_java-json-parser\\demo.json"
                    //orig: "D:\\try\\test.json"
            Gson gson = new Gson();
            Type collectionType = new TypeToken<List<List<Tasks>>>() {
            }.getType();
            List<List<Tasks>> details = gson.fromJson(br, collectionType);
            connection.connect();
            for (int person=0;person<details.size();person++) {
                for (int task = 0; task < details.get(person).size(); task++)
                {
                    connection.insert_query
                            (
                                    details.get(person).get(task).getName(),
                                    details.get(person).get(task).getCompletedDate(),
                                    details.get(person).get(task).getSolution(),
                                    personIsInserted
                            );
                    personIsInserted=true;
                }
                personIsInserted=false;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    } //main end
}