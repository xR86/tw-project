/**
 * Created by alber_000 on 5/22/2016.
 */

var express = require('express');
var router = express.Router();
var users=require('./../utils/addUser');

router.post('/',users.post);
router.get('/', function(req, res, next) {
    res.render('signup', { message: 'SIGNUP' });
});

module.exports=router;