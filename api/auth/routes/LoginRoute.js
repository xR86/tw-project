/**
 * Created by alber_000 on 5/22/2016.
 */
var express = require('express');
var router = express.Router();
var login=require('./../utils/logins');

router.post('/',login.post);
router.get('/', function(req, res, next) {
    res.render('login', { title: 'LOGIN' });
});
module.exports=router;