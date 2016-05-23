/**
 * Created by alber_000 on 5/23/2016.
 */
var express = require('express');
var router = express.Router();
var logout=require('./../utils/logout');

router.get('/',logout(),function(req, res, next) {
    res.redirect('/About');
});
module.exports=router;