# JSON Parser

### Initial fails and motivation for using GSON library.

My first try was copying the JSON information into a table in PL/SQL
then parsing the information with a regular expresion, selecting the essential information.


The very first problem was when using the [UTL_FILE library](https://docs.oracle.com/cd/B19306_01/appdev.102/b14258/u_file.htm#BABDEJDH)

The library has functions for opening/closing the file, parsing the file line by line and inserting the information into a variable (to be inserted on a table later on)

### Problem? .. 
The UTL_FILE.GET_LINE function accepts only VARCHAR2 types (meaning the maximum size of a line being 32767 characters long)
In our .json file we encounter right at the first line a line 93384 characters long.


Then I started searching for a [library that can accept CLOB types or 'Character Large Objects'](http://www.orafaq.com/wiki/CLOB)
These are types specific to very large variables (up to 4GB).
The library had enough functions to satisfy our needs (https://docs.oracle.com/cd/B19306_01/appdev.102/b14258/d_lob.htm)

Although it was more than enough, this method proved not to be so efficient.

### Why? ..
Inserting the raw information in the database was working fine but parsing it was the problem
(in my case it took 2 minutes parsing the first line representing all the tasks for one contestant)
Having about 10^5 lines, more or less with the same size that would mean waiting 2*10^5 minutes to parse the whole information into a table.



## What to use next? 
[GSON library for JSON parsing(deserialization) in Java](https://github.com/google/gson)

### How does it work? 
First, we need to look at the json schema. We can see the data is divided like this:

    --> root
        --> Contestant1
            --> Task1
                --> name
                --> completedDate
                --> solution
            --> Task2
                --> name
                --> completedDate
                --> solution
            --> ..
        --> Contestant2
            --> Task1
                --> name
                --> completedDate
                --> solution
            --> Task2
                --> name
                --> completedDate
                --> solution
            --> ..
        --> ..

A contestant can have an uncompleted task (all of the fields are null), 
but in order to have a taskName or solution for it, it is mandatory to have a 'completedDate' field.


So the data is composed of a list of Contestants.
Each contestant has a list of Tasks each with 3 optional fields.

In order to deserialize the file we need to create an object defining a Task,
then parsing the entire file as a list with lists of tasks.

Each object shall be parsed and inserted into the database after making a connection with Oracle 11.2g in Java.


### Other problems? ..
The file is still to big to parse from one single execution.
For that we shall need a heap size at least equal to the json file size or else we would encounter this error:

> "Error occurred during initialization of VM
> Could not reserve enough space for object heap
> Could not create the Java virtual machine."

That is because the default Java VM is made to consume a low amount of memory (about 256M).
If we have enough free memory for parsing the entire file we could [set the -Xmx parameter](http://alvinalexander.com/blog/post/java/java-xmx-xms-memory-heap-size-control) 
in order to accept as much memory as we want (and as long as we have it, of course).

But if we still don't have enough free memory then the big json file shall be split into multiple files
in order to insert the formatted information in our database and work with it easily.

# CONCLUSION?
Parsing 195 lines with the GSON library took 1/4 the time parsing 1 line 
straight in PL/SQL with regular expressions (see demo.PNG) and we don't have
to "clone" the raw information before parsing it.

![demo.PNG](/_java-json-parser/demo.PNG?raw=true "demo.PNG")


## INSERTING DATA IN THE DATABASE
For this we will use the [JDBC library](http://www.oracle.com/technetwork/apps-tech/jdbc-112010-090769.html).

Screenshots:

![insert.PNG](/_java-json-parser/insert.PNG?raw=true "insert.PNG")

![query.PNG](/_java-json-parser/query.PNG?raw=true "query.PNG")


### Bugs to fix:

![problem1.PNG](/_java-json-parser/problem1.PNG?raw=true "problem1.PNG")
![problem2.PNG](/_java-json-parser/problem2.PNG?raw=true "problem2.PNG")

