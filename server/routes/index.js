var express = require('express');
var router = express.Router();
var path =require('path');

var usersRouter=require('./user_route');
var sessionRouter=require('./session_route');


module.exports = function(app) {




  app.use('/api/users', usersRouter);
  app.use('/api/sessions', sessionRouter);
  
  /* GET home page. */
  app.get('/', function(req, res, next) {
      var root=path.join(__dirname+'../../../client');
      res.sendFile('/index.html', { root: root });
  });

}








