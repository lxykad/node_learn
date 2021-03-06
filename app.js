var express = require('express');
var Promise = require('bluebird');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sha = require('sha1');
var blog = require('./src/blog/router/home')

//passport
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var opt = require('./src/optdb');
var soup = require('./src/nsoup');
var wechat = require('./src/wechatconfig');
var t1 = require('./src/http');


/*//微信公共号接入测试
 var config = {
 appID: 'wx52e971ef431fdfb2',
 appSecret: 'aV0QEhwy0kqlTqv03KHJo6oBDPPmAIAhh1CateqrnPa',
 token: 'lxykad007'
 }*/

var app = express();


//连接本地数据库
var uri = 'mongodb://localhost/ApiServer';
var db = mongoose.connect(uri, {
  useMongoClient: true,
  promiseLibrary: global.Promise

});
//mongoose.Promise = Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//不使用签名
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//passport
//app.use(express.session({ secret: 'lxy.kad', cookie: { maxAge: 6000 } }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());

//
passport.use('local', new LocalStrategy((username, password, done) => {
  var user = {
    id: '1',
    username: 'lxy',
    password: '123'
  }
}));


//wechat
app.use(wechat);

app.use('/', index);
app.use('/users', users);
app.use('/opt', opt);
app.use('/', soup);
app.use('/', t1);
app.use('/blog', blog);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env')==='development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
