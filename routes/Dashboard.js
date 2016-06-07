/**
 * Created by alber_000 on 4/9/2016.
 */
var express = require('express');
var router = express.Router();  
var auth=require('../api/auth/utils/myAuth');

var oracledb = require('oracledb');
var connAttrs=require('../api/auth/utils/config');
var SimpleOracleDB = require('simple-oracledb');
var generic=require('../api/databaseFunctions/genericSelect');
 
SimpleOracleDB.extend(oracledb);
 

router.get('/', auth() ,function(req, res, next) {
	"use strict";
/*
	oracledb.getConnection(connAttrs.database, function (err, connection) {
         if (err) {
             res.set('Content-Type', 'application/json');
             res.status(500).send(JSON.stringify({
                 status: 500,
                 message: "Error connecting to DB",
                 detailed_message: err.message
             }));
             return;
         } connection.execute(
		  "select * from monthly_tasks",
		  { ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret2: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret3: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret4: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 } },
		  function (err, result)
		  {
		    if (err) { console.error(err.message); return; }
		    else{
                var jsonData = JSON.stringify(result.outBinds);
                	
                var parsedData = JSON.parse(jsonData);
                var siteUsersNumber = parsedData.ret4;

                res.render('Dashboard', {
                	resultSetUsers:fccUserNumber, 
                	resultSetSolvedTasks:solvedTasksNumber,
                	resultSetTasks: tasksNumber,
                	resultSetSiteUsers: siteUsersNumber
                });
		    }
		    
		  });
     });*/
	
	oracledb.getConnection(connAttrs.database, function (err, connection) {
         if (err) {
             // Error connecting to DB
             res.set('Content-Type', 'application/json');
             res.status(500).send(JSON.stringify({
                 status: 500,
                 message: "Error connecting to DB",
                 detailed_message: err.message
             }));
             return;
         }
 
		  connection.execute(
		  "BEGIN :ret := personsCount(); :ret2 := solvedTasksCount(); :ret3 := tasksCount(); :ret4 := siteUsersCount(); :ret5 := FreeCodeCamp.taskCompletionRate_task(139); END;",
		  { ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret2: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret3: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret4: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
		    ret5: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 } },
		  function (err, result)
		  {
		    if (err) { console.error(err.message); return; }
		    else{
		    	//console.log(result.outBinds);
                var jsonData = JSON.stringify(result.outBinds);
                	
                var parsedData = JSON.parse(jsonData);
                console.log(parsedData);
                var fccUserNumber = parsedData.ret;
                var solvedTasksNumber = parsedData.ret2;
                var tasksNumber = parsedData.ret3;
                var siteUsersNumber = parsedData.ret4;
                var taskCompletionRate = parsedData.ret5;
                taskCompletionRate = taskCompletionRate.replace(',', '.');
                //console.log(fccUserNumber);
                //console.log(solvedTasksNumber);


                res.render('Dashboard', {
                	resultSetUsers:fccUserNumber, 
                	resultSetSolvedTasks:solvedTasksNumber,
                	resultSetTasks: tasksNumber,
                	resultSetSiteUsers: siteUsersNumber,
                	resultTaskCompletionRate: taskCompletionRate
                });
		    }
		    
		  });
     });
});

module.exports = router;