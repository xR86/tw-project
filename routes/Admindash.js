var express = require('express');
var router = express.Router();
var auth=require('../api/auth/utils/myAuth');

router.get('/',auth(),function(req, res, next) {
    res.render('Admindash');
});

module.exports = router;