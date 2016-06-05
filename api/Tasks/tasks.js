/**
 * Created by alber_000 on 5/21/2016.
 */

var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var generic=require('../databaseFunctions/genericSelect');
var connAttrs = require('./../auth/utils/config');

router.get('/', function (req,res) {
    "use strict";

   generic(req,res,"SELECT * FROM Tasks",[]);
});

router.get('/:task_id', function (req,res) {
    "use strict";

    generic(req,res,"SELECT * FROM Tasks WHERE task_id= :task_id", [req.params.task_id]);
});

router.get('/name/:task_name', function (req,res) {
    "use strict";

    generic(req,res,"SELECT * FROM Tasks WHERE task_name= :task_name", [req.params.task_name]);
});

module.exports = router;