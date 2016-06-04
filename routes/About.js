/**
 * Created by alber_000 on 4/9/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('About', { user: req.session.user_firstname });
   // res.render('demoHeader', { title: 'About' });
});

module.exports = router;