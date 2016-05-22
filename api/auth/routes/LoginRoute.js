/**
 * Created by alber_000 on 5/22/2016.
 */
var express = require('express');
var router = express.Router();
var logins=require('./../utils/logins');

router.post('/',logins.post);

module.exports=router;