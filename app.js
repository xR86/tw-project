var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();


var routes = require('./routes/index');
var users = require('./routes/users');
var dash= require('./routes/Dashboard');
var datafil= require('./routes/Datafiltering');
var help= require('./routes/Help');
var about= require('./routes/About');
var persons=require('./api/persons');
var tasks=require('./api/tasks');
var solvedTasks=require('./api/solvedTasks');

var testPublic=require('./api/testLogin/publicRoute');
var testProtected=require('./api/testLogin/protectedRoute');
var usersLog=require('./api/auth/routes/addUserRoute');
var logins=require('./api/auth/routes/LoginRoute');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', routes);
app.use('/users', users);
app.use('/Dashboard',dash);
app.use('/datafiltering',datafil);
app.use('/Help',help);
app.use('/About',about);
app.use('/api/persons',persons);
app.use('/api/tasks',tasks);
app.use('/api/solvedTasks',solvedTasks);
app.use('/api/public',testPublic);
app.use('/api/protected',testProtected);
app.use('/addUser',usersLog);
app.use('/login',logins);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;