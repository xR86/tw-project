/**
 * Created by alber_000 on 5/21/2016.
 */

var express = require('express');
var router = express.Router();
var auth=require('./../auth/utils/myAuth');
var generic=require('../databaseFunctions/genericSelect');
var filter=require('../databaseFunctions/filter');



router.get('/:p_id', function (req,res) {
    "use strict";
    generic(req,res,"SELECT * FROM Persons WHERE p_id= :p_id",[req.params.p_id])
});

router.get('/', function (req,res) {
    "use strict";

    generic(req,res,"SELECT * FROM Persons",[]);
});

module.exports = router;
