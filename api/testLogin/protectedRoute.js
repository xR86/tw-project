/**
 * Created by alber_000 on 5/22/2016.
 */

var express = require('express');
var router = express.Router();
var protectedThings = require('./protectedThings');
var auth=require('./../auth/utils/auth');

router.get('/',auth('BASE'),protectedThings.get);

module.exports=router;