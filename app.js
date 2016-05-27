var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var app = express();


var routes = require('./routes/index');
var users = require('./routes/users'); //this is useless
var dash= require('./routes/Dashboard');
var datafil= require('./routes/Datafiltering');
var help= require('./routes/Help');
var about= require('./routes/About');

var persons=require('./api/Persons/persons');
var tasks=require('./api/SolvedTasks/tasks');
var solvedTasks=require('./api/SolvedTasks/solvedTasks');

var login=require('./api/auth/routes/LoginRoute');
var signup=require('./api/auth/routes/signupRoute');
var logout=require('./api/auth/routes/LogoutRoute');
var remove=require('./api/auth/routes/deleteAccountRoute');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 15*60*1000 }})); //session expires in 15 minutes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.use('/Dashboard',dash);
app.use('/datafiltering',datafil);
app.use('/Help',help);
app.use('/About',about);

app.use('/api/persons',persons);
app.use('/api/tasks',tasks);
app.use('/api/solvedTasks',solvedTasks);

app.use('/login',login);
app.use('/logout',logout);
app.use('/signup',signup);
app.use('/remove',remove);
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