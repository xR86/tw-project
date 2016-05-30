/**
 * Created by alber_000 on 5/21/2016.
 */

var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var connAttrs = require('./../auth/utils/config');
var filter=require('./taskSelectType');
var auth=require('./../auth/utils/myAuth');
var SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);

var generic=require('../databaseFunctions/genericSelect');

router.post('/id',auth(), filter.filterById(""));
router.post("/hasSolution",auth(),filter.filterBySolutionExistence(""));
router.post('/betweenDates',auth(),filter.filterByDates(""));

router.get('/', function (req,res) {
    "use strict";
    generic(req,res,"Select * from solvedtasks",[]);
});

router.get('/:st_id', function (req,res) {
    "use strict";
    var params=[req.params.st_id];
    generic(req,res,"select * from solvedtasks WHERE task_id= :task_id",params);
});

router.get('/name/:task_name', function (req,res) {
    "use strict";
    var params=[req.params.task_name];
    generic(req,res,"select * from solvedtasks s join tasks t on t.TASK_ID = s.TASK_ID WHERE task_name= :task_name",params);
});

router.get('/hasSolution/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.hasSolution];
    generic(req,res,"select * from solvedtasks where hasSolution= :hasSolution",params);
});

module.exports = router;