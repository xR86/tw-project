/**
 * Created by alber_000 on 5/21/2016.
 */

var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var config=require('../auth/utils/config');
var auth=require('./../auth/utils/myAuth');
var SimpleOracleDB = require('simple-oracledb');
var generic=require('../databaseFunctions/genericSelect');

SimpleOracleDB.extend(oracledb);


router.get('/', function (req,res) {
    "use strict";
    generic(req,res,"select * from solvedtasks",[]);
});

router.get('/:st_id', function (req,res) {
    "use strict";
    var params=[req.params.st_id];
    generic(req,res,"select * from solvedtasks WHERE st_id= :st_id",params);
});

router.get('/task_name/:task_name', function (req,res) {
    "use strict";
    var params=[req.params.task_name];
    generic(req,res,"select * from solvedtasks s join tasks t on t.TASK_ID = s.TASK_ID WHERE task_name= :task_name",params);
});

router.get('/task_name/date/:task_name/:completeddate', function (req,res) {
    "use strict";
    var params=[req.params.task_name,req.params.completeddate];
    generic(req,res,"select * from solvedtasks s join tasks t on t.TASK_ID = s.TASK_ID WHERE task_name= :task_name and " +
        "TO_DATE(TRUNC(completeddate),'DD-MM-YY')=TO_DATE(:completeddate,'DD-MM-YY')",params);
});

router.get('/task_name/hasSolution/:task_name/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.task_name,req.params.hasSolution];
    generic(req,res,"select * from solvedtasks s join tasks t on t.TASK_ID = s.TASK_ID WHERE task_name= :task_name and hasSolution= :hasSolution",params);
});

router.get('/task_name/:task_name/:completeddate/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.task_name,req.params.completeddate,req.params.hasSolution];
    generic(req,res,"select * from solvedtasks s join tasks t on t.TASK_ID = s.TASK_ID WHERE task_name= :task_name and " +
        "TO_DATE(TRUNC(completeddate),'DD-MM-YY')=TO_DATE(:completeddate,'DD-MM-YY') and hasSolution= :hasSolution",params);
});

router.get('/p_id/:p_id', function (req,res) {
    "use strict";
    var params=[req.params.p_id];
    generic(req,res,"select * from solvedtasks where p_id= :p_id",params);
});

router.get('/p_id/:p_id/:completeddate', function (req,res) {
    "use strict";
    var params=[req.params.p_id,req.params.completeddate];
    generic(req,res,"select * from solvedtasks where p_id= :p_id and TO_DATE(TRUNC(completeddate),'DD-MM-YY')=TO_DATE(:completeddate,'DD-MM-YY')",params);
});

router.get('/p_id/hasSolution/:p_id/:completeddate/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.p_id,req.params.completeddate,req.params.hasSolution];
    generic(req,res,"select * from solvedtasks where p_id= :p_id and TO_DATE(TRUNC(completeddate),'DD-MM-YY')=TO_DATE(:completeddate,'DD-MM-YY') and hasSolution= :hasSolution",params);
});

router.get('/hasSolution/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.hasSolution];
    generic(req,res,"select * from solvedtasks where hasSolution= :hasSolution",params);
});

router.get('/completeddate/:completeddate', function (req,res) {
    "use strict";
    var params=[req.params.completeddate];
    generic(req,res,"select * from solvedtasks where TO_DATE(TRUNC(completeddate),'DD-MM-YY')=TO_DATE(:completeddate,'DD-MM-YY')",params);
});

router.get('/completeddate/:completeddate/:hasSolution', function (req,res) {
    "use strict";
    var params=[req.params.completeddate,req.params.hasSolution];
    generic(req,res,"select * from solvedtasks where TO_DATE(TRUNC(completeddate),'DD-MM-YY')=TO_DATE(:completeddate,'DD-MM-YY') and hasSolution= :hasSolution",params);
});

module.exports = router;