/**
 * Created by alber_000 on 5/21/2016.
 */

//may become useless in the near future
var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var auth=require('./../auth/utils/myAuth'); 
var select=require('./personSelectType');
var connAttrs = require('./../auth/utils/config');
var generic=require('../databaseFunctions/genericSelect');

router.post('/tasksAttempted',auth(),select("SELECT * FROM Persons WHERE p_id= :p_id ORDER BY TASKS_ATTEMPTED_COUNTER ASC"));
router.post('/tasksCompleted',auth(),select("SELECT * FROM Persons WHERE p_id= :p_id ORDER BY TASKS_COMPLETED_COUNTER ASC"));

router.get('/:p_id', function (req,res) {
    "use strict";
    generic(req,res,"SELECT * FROM Persons WHERE p_id= :p_id",[req.params.p_id])
});

router.get('/', function (req,res) {
    "use strict";

    generic(req,res,"SELECT * FROM Persons",[]);
});

module.exports = router;
