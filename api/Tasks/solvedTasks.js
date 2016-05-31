/**
 * Created by alber_000 on 5/21/2016.
 */

var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var auth=require('./../auth/utils/myAuth');
var SimpleOracleDB = require('simple-oracledb');
var filter=require('./../databaseFunctions/filter');
var generic=require('../databaseFunctions/genericSelect');
SimpleOracleDB.extend(oracledb);



router.post("/hasSolution",function(req,res) {
    var filter1={st_id:req.body.st_id,hasSolution:req.body.hasSolution,completeddate:req.body.completeddate};
    filter.filterBy(req,res,"select * from solvedtasks where hasSolution= :hasSolution and st_id= :st_id and completeddate= :completeddate",filter1);
});


router.get('/testId',function(req,res) {
   res.render('apiExperiments');
});




router.get('/', function (req,res) {
    "use strict";
    generic(req,res,"Select * from solvedtasks",[]);
});

router.get('/:st_id', function (req,res) {
    "use strict";
    var params=[req.params.st_id];
    generic(req,res,"select * from solvedtasks WHERE st_id= :st_id",params);
});

router.get('/name/:task_name', function (req,res) {
    "use strict";
    var params=[req.params.task_name];
    generic(req,res,"select * from solvedtasks s join tasks t on t.TASK_ID = s.TASK_ID WHERE task_name= :task_name",params);
});

router.get('/person/:p_id', function (req,res) {
    "use strict";
    var params=[req.params.p_id];
    generic(req,res,"select * from solvedtasks where p_id= :p_id",params);
});

router.get('/hasSolution/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.hasSolution];
    generic(req,res,"select * from solvedtasks where hasSolution= :hasSolution",params);
});

router.get('/date/:completeddate', function (req,res) {
    "use strict";
    var params=[req.params.completeddate];
    generic(req,res,"select * from solvedtasks where completeddate= :completeddate",params);
});

module.exports = router;