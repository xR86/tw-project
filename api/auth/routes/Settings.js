/**
 * Created by alber_000 on 5/25/2016.
 */


var express = require('express');
var router = express.Router();
var users=require('./../utils/deleteAccount');
var config=require('../utils/config');
var auth=require('../utils/myAuth');

router.get('/', auth(), function(req, res, next) {
    res.render('Settings');
});
router.post('/',auth(),users.remove);

module.exports=router;