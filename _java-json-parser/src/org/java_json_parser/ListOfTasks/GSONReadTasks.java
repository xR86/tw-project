package org.java_json_parser.ListOfTasks;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.java_json_parser.ObjectStructure.Tasks;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 *
 *
 */
public class GSONReadTasks {

    public static void main(String[] args) {

        try {

            System.out.println("Reading JSON from a file");
            System.out.println("----------------------------");

            BufferedReader br = new BufferedReader(
                    new FileReader("E:\\test_name_null.json"));

            JsonElement json = new JsonParser().parse(br);
            JsonArray array= json.getAsJsonArray();
            Iterator iterator = array.iterator();
            List<Tasks> details = new ArrayList<Tasks>();

            while(iterator.hasNext()){
                JsonElement json2 = (JsonElement)iterator.next();
                Gson gson = new Gson();
                Tasks tasks = gson.fromJson(json2, Tasks.class);
                details.add(tasks);
            }


            for (int task=0;task<details.size();task++) {
                java.util.Date time=new java.util.Date(details.get(task).getCompletedDate()*1000); //convert unix timestamp to date
                System.out.println(
                        "TASK NB: " + (task + 1) + '\n'
                        + "NAME: " + details.get(task).getName() + '\n'
                        + "COMPLETED DATE: " + time + '\n'
                        +"SOLUTION: " + details.get(task).getSolution() + "\n\n\n"
                );
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
