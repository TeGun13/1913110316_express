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
const config = require('./config/index')



var app = express();
monogoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

app.use(logger('dev'));
app.use(express.json({
    limit:'50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', Company);
app.use('/staff',Staff);
app.use('/menu',ShopRouter);
app.use('/shop',ShopRouter);


module.exports = app;
