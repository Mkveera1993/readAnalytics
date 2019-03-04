var express = require('express');
var router = express.Router();
var sessionService=require('../services/session_service');

router.get('/', function(req, res) {
  sessionService.getSessions(req.query,function(err,sessions){
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).json(sessions)
    }
  })
});
router.get('/:id', function(req, res) {
  sessionService.getSession(req.params.id,function(err,session){
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).json(session)
    }
  })
});
router.post('/', function(req, res) {
  sessionService.createSession(req.body,function(err,session){
    if(err){
      res.status(500).send(err)
    }else{
      res.status(201).json(session)
    }
  })
});
router.put('/:id', function(req, res) {
  sessionService.updateSession(req.body,function(err,session){
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).json(session)
    }
  })
});
router.post('/getSessionReport', function(req, res) {
  sessionService.getSessionReport(req.body,function(err,sessionReport){
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).json(sessionReport)
    }
  })
});

module.exports = router;
