JSON parser made in Java with GSON library

Reads a list of Contestants (each having a list of tasks represented by taskName, taskCompletionDate & taskSolution. 
Each of them is optional but taskCompletionDate is mandatory for a task to have the other 2)

This shall be used to parse the JSON file and insert the data in an Oracle database.

WARNING: don't use on files >128m without proper Java configuration for heap size
