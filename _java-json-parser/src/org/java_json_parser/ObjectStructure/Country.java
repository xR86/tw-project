/**
 * this is just a model I used
 */

package org.java_json_parser.ObjectStructure;

import java.util.List;

public class Country {

    String name;
    int population;
    private List<String> listOfStates;

    //getter and setter methods  

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    public List<String> getListOfStates() {
        return listOfStates;
    }

    public void setListOfStates(List<String> listOfStates) {
        this.listOfStates = listOfStates;
    }

}
