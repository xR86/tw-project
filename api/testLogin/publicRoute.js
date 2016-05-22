/**
 * Created by alber_000 on 5/22/2016.
 */

var express = require('express');
var router = express.Router();
var publicThings = require('./publicThings');

router.get('/',publicThings.get);

module.exports=router;