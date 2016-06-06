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


router.get('/',function(req, res, next) {
	"use strict";
	
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
		  "BEGIN :ret := personsCount(); END;",
		  { ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 } },
		  function (err, result)
		  {
		    if (err) { console.error(err.message); return; }
		    else{
		    	console.log(result.outBinds);
                var jsonData = JSON.stringify(result.outBinds);
                	
                var parsedData = JSON.parse(jsonData);
                console.log(parsedData);
                var fccUserNumber = parsedData.ret;
                console.log(fccUserNumber);

                res.render('Dashboard', {resultSet:fccUserNumber});
		    }
		    
		  });
     });
});

module.exports = router;