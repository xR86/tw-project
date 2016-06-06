/**
 * Created by alber_000 on 4/9/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('Help');
});


/*
var app = require('../app');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');

var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('api/documentation/api.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);*/

router.get('/rest', function(req, res, next) {
	/*// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
	app.use(swagger.metadata(swaggerDoc));

	// Validate Swagger requests
	app.use(swagger.validator(swaggerDoc));

	// Route validated requests to appropriate controller
	app.use(swagger.router(swaggerDoc, options));

	// Serve the Swagger documents and Swagger UI
	app.use(swagger.ui(swaggerDoc));*/
	
    res.render('Help-REST');
});


module.exports = router;