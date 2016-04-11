/**this is just a model I used
 *
 */

package org.java_json_parser.Examples;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.java_json_parser.ObjectStructure.Country;
import com.google.gson.Gson;

/*
 * @Author : Arpit Mandliya
 */
public class GSONWritingToFileExample {

    public static void main(String[] args) {

        Country countryObj=new Country();
        countryObj.setName("India");
        countryObj.setPopulation(1000000);
        List<String> listOfStates=new ArrayList<String>();
        listOfStates.add("Madhya Pradesh");
        listOfStates.add("Maharastra");
        listOfStates.add("Rajasthan");

        countryObj.setListOfStates(listOfStates);
        Gson gson = new Gson();

        // convert java object to JSON format,
        // and returned as JSON formatted string
        String json = gson.toJson(countryObj);

        try {
            //write converted json data to a file named "CountryGSON.json"
            FileWriter writer = new FileWriter("E:\\CountryGSON.json");
            writer.write(json);
            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(json);

    }
}
