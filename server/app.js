var express = require('express');
var cookieParser = require('cookie-parser');
var config=require('./config/config')

// auth purpose
var session = require('express-session');
var passport = require('passport');
var mongoose=require('mongoose');
var mongoStore = require('connect-mongo')(session);


var app = express();

app.use(express.static(__dirname+'../../client/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  }));

require('./routes/index')(app);

module.exports = app;
