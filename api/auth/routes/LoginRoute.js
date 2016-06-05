/**
 * Created by alber_000 on 5/22/2016.
 */
var express = require('express');
var router = express.Router();
var login=require('./../utils/login');
var access=require('./../utils/denyAccessToLogin');

router.post('/',login.post);
router.get('/',access(),function(req, res, next) {
    res.render('login');
});
module.exports=router;