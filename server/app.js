var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var passport = require('passport');
var getIP = require('ipware')().get_ip;
var stamp = require('console-stamp')(console);

var index = require('./routes/index');
var tbgen = require('./routes/tbgen');
var login = require('./routes/login');
var gettb = require('./routes/gettb');
var tbdel = require('./routes/tbdel');
var getstudents = require('./routes/getstudents');
var deletestudent = require('./routes/deletestudent');
var addstudent = require('./routes/addstudent');
var getteams = require('./routes/getteams');
var getclients = require('./routes/getclients');
var createclient = require('./routes/createclient');
var getadvisors = require('./routes/getadvisors');
var deladvisor = require('./routes/deladvisor');
var createteam = require('./routes/createteam');
var editteam = require('./routes/editteam');
var email = require('./routes/email');
var getcontent = require('./routes/getcontent')
var createcategory = require('./routes/createcategory');
var createcontent = require('./routes/createcontent');
var deletecategory = require('./routes/deletecategory');
var deletecontent = require('./routes/deletecontent');
var migrateteams = require('./routes/migrateteams');
var deleteteam = require('./routes/deleteteam');

var app = express();

app.use(cors());

// Add basic logging.
app.use(function (req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/dist')));
app.use('/media', express.static(path.join(__dirname, '/media')));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

//app.use('/', index);
app.use('/api/tbgen', tbgen);
app.use('/api/login', login);
app.use('/api/gettb', gettb);
app.use('/api/tbdel', tbdel);
app.use('/api/getstudents', getstudents);
app.use('/api/deletestudent', deletestudent);
app.use('/api/addstudent', addstudent);
app.use('/api/getteams', getteams);
app.use('/api/getclients', getclients);
app.use('/api/createclient', createclient);
app.use('/api/getadvisors', getadvisors);
app.use('/api/email', email);
app.use('/api/deladvisor', deladvisor);
app.use('/api/createteam', createteam);
app.use('/api/editteam', editteam);
app.use('/api/getcontent', getcontent);
app.use('/api/createcategory', createcategory);
app.use('/api/createcontent', createcontent);
app.use('/api/deletecategory', deletecategory);
app.use('/api/deletecontent', deletecontent);
app.use('/api/migrateteams', migrateteams);
app.use('/api/deleteteam', deleteteam);

if (app.get('env') === 'production') {

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
