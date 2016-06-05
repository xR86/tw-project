
var express = require('express');
var router = express.Router();
var solvedTasksFilter=require('../api/databaseFunctions/solvedTasksFilter');
var personFilter=require('../api/databaseFunctions/personFilter');

router.get('/', function(req, res, next) {
    res.render('Datafiltering');
});

router.get('/solvedTasksFilter',function(req,res) {
    res.render('solvedTasksFiltering');
});
router.post('/solvedTasksFilter',solvedTasksFilter);

router.get('/personFilter',function(req,res) {
    res.render('personFilter');
});
router.post('/personFilter',personFilter);

module.exports = router;