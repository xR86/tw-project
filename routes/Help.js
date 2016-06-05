/**
 * Created by alber_000 on 4/9/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('Help');
});
router.get('/rest', function(req, res, next) {
    res.render('Help-REST');
});

module.exports = router;