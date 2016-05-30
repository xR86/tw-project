package org.java_json_parser.ObjectStructure;

/**
 * Class representing a task with 3 components (task name, task completion date, task solution)
 */

public class Tasks {
    private String name;
    private long completedDate;
    private String solution;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(long completedDate) {
        this.completedDate = completedDate;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

}
