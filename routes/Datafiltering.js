
var express = require('express');
var router = express.Router();
var solvedTasksFilter=require('../api/databaseFunctions/solvedTasksFilter');
var personFilter=require('../api/databaseFunctions/personFilter');
var auth=require('../api/auth/utils/myAuth');


router.get('/',auth(), function(req, res, next) {
    res.render('Datafiltering');
});

router.get('/solvedTasksFilter',function(req,res) {
    res.render('solvedTasksFiltering');
});
router.post('/taskFilter',auth(),solvedTasksFilter);

router.get('/personFilter',function(req,res) {
    res.render('personFilter');
});
router.post('/personFilter',auth(),personFilter);

module.exports = router;