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
import java.util.Date;

/**
 * Reads a list of contestants
 * each having his own nb of tasks
 * (also contained in a list for each person)
 */
public class MainParser {

    public static void main(String[] args) {
        //Date time;
        try {
            BufferedReader br = new BufferedReader(
                    new FileReader("E:\\try\\tf.json")); //destination to json here
            Gson gson = new Gson();
            Type collectionType = new TypeToken<List<List<Tasks>>>() {
            }.getType();
            List<List<Tasks>> details = gson.fromJson(br, collectionType);

            DBConnect connection = new DBConnect("STUDENT","STUDENT");
            connection.connect();

        for (int person=0;person<details.size();person++) {

            for (int task = 0; task < details.get(person).size(); task++)
            {
                connection.insert_query(person + 1,
                        task + 1,
                        details.get(person).get(task).getName(),
                        details.get(person).get(task).getCompletedDate()/1000,
                        details.get(person).get(task).getSolution());
            }
        }


        } catch (IOException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
