var express = require('express');
var router = express.Router();
var login=require('../api/auth/utils/login');
var access=require('../api/auth/utils/denyAccessToLogin');

router.post('/',login.post);

router.get('/',access(),function(req, res, next) {
    res.render('Loginadmin');
});

module.exports = router;