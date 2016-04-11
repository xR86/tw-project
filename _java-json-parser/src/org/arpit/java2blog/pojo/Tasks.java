package org.arpit.java2blog.pojo;

/**
 * Class representing a task with 3 components (task name, task completion date, task solution)
 */

import java.util.ArrayList;
import java.util.List;

public class Tasks {
    String name;
    String completedDate;
    String solution;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(String completedDate) {
        this.completedDate = completedDate;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

}
