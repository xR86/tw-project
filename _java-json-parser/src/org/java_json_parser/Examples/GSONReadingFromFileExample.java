/**
 * this is just a model I used
 */


package org.java_json_parser.Examples;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import org.java_json_parser.ObjectStructure.Country;
import com.google.gson.Gson;

/*
 * @Author : Arpit Mandliya
 */


public class GSONReadingFromFileExample {

    public static void main(String[] args) {

        Gson gson = new Gson();

        try {

            System.out.println("Reading JSON from a file");
            System.out.println("----------------------------");

            BufferedReader br = new BufferedReader(
                    new FileReader("E:\\CountryGSON.json"));

            //convert the json string back to object
            Country countryObj = gson.fromJson(br, Country.class);

            System.out.println("Name Of Country: "+countryObj.getName());


            System.out.println("Population: "+countryObj.getPopulation());

            System.out.println("States are :");

            List<String> listOfStates = countryObj.getListOfStates();
            for (int i = 0; i < listOfStates.size(); i++) {
                System.out.println(listOfStates.get(i));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}