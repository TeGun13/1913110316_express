var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const monogoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Company = require('./routes/company');
const Staff = require('./routes/staff');
const ShopRouter = require('./routes/shop');
const config = require('./config/index');
const passport = require('passport');

const MonitorRouter = require('./routes/monitor')

const errorHandle = require('./middleware/errorHandle')

var app = express();
monogoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

app.use(logger('dev'));
app.use(express.json({
    limit:'50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', Company);
app.use('/staff',Staff);
app.use('/menu',ShopRouter);
app.use('/shop',ShopRouter);

app.use('/monitor',MonitorRouter);

app.use(errorHandle);

module.exports = app;
