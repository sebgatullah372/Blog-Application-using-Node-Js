var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var authenticate = require('./authenticate')(passport);

//var flash = require('connect-flash');

var bodyparser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var addarticleRouter = require('./routes/add_article');
var fullarticleRouter = require('./routes/article');
var deleteRouter = require('./routes/delete_article');
//var comment = require('./routes/comments');
const url = 'mongodb://localhost:27017/Blog';

var connect = mongoose.connect(url);
connect.then((db)=>{
  console.log('Connected to the server');
},(err)=>{
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
//Express Session
app.use(session({
  name: 'session-id',
  secret: '1234-3234-32345-9845',
  saveUninitialized: true,
  resave: true
}));
//Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Passport Configurtion
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next(); 
})
app.use(bodyparser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles/', addarticleRouter);
app.use('/article/', fullarticleRouter);
app.use('/article/', deleteRouter);
//app.use('/article/', comment);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
