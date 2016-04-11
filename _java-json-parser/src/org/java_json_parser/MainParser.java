package org.java_json_parser;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.java_json_parser.ObjectStructure.Tasks;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Date;

/**
 * Reads a list of contestants
 * each having his own nb of tasks
 * (also contained in a list for each person)
 */
public class MainParser {

    public static void main(String[] args) {
        Date time;
        try {
            BufferedReader br = new BufferedReader(
                    new FileReader("E:\\try\\out2.json")); //destination to json here
            Gson gson = new Gson();
            Type collectionType = new TypeToken<List<List<Tasks>>>() {
            }.getType();
            List<List<Tasks>> details = gson.fromJson(br, collectionType);

        for (int person=0;person<details.size();person++) {

            for (int task = 0; task < details.get(person).size(); task++)
            {
                if (details.get(person).get(task).getCompletedDate() != 0)
                    time=new Date(details.get(person).get(task).getCompletedDate()*1000); //convert unix timestamp to date
                else
                    time=null; //is instantiated if not found

                System.out.println(
                        "PERSON " + (person + 1) + ' '
                                + "TASK NB: " + (task + 1) + '\n'
                                + "NAME: " + details.get(person).get(task).getName() + '\n'
                                + "COMPLETED DATE: " + time + '\n'
                                +"SOLUTION: " + details.get(person).get(task).getSolution() + "\n\n\n"
                );
            }
        }


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
