/**
 * Created by alber_000 on 4/9/2016.
 */
var express = require('express');
var router = express.Router();
var auth=require('../api/auth/utils/myAuth');

router.get('/',auth(),function(req, res, next) {
    res.render('Dashboard', { title: 'Express' });
});

module.exports = router;