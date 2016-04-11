package org.arpit.java2blog;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.arpit.java2blog.pojo.Tasks;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Reads a list of tasks from a json file
 * Change the location of the json file at line 32 plz
 */
public class GSONReadTasks {

    public static void main(String[] args) {

        //Gson gson = new Gson();

        try {

            System.out.println("Reading JSON from a file");
            System.out.println("----------------------------");

            BufferedReader br = new BufferedReader(
                    new FileReader("E:\\pretendent.json"));

            //Tasks[] tasks = gson.fromJson(br, Tasks.class);


            //System.out.println("Name Of Task: "+tasks[0].getName());
            //System.out.println("Date: "+tasks[0].getCompletedDate());
            //System.out.println("Solution: "+tasks[0].getSolution());

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


            for (int i=0;i<details.size();i++)
                System.out.println("NAME: " + details.get(i).getName() + '\n'
                        + "COMPLETED DATE: " + details.get(i).getCompletedDate() + '\n'
                        + "SOLUTION: " + details.get(i).getSolution() + "\n\n\n");


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
