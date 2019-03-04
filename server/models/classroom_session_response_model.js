'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSessionResponseSchema = new Schema({
 
  session_key: {
      type:String
  },
  school_code: {
      type:String
  },
  class_code: {
      type:String
  },
  user_code: {
      type:String
  },
  answers: [{
      type:Map
  }
  ],
  session: {
      type:Number
  },
  topic: {
      type:Number
  },
  read_velocity: {
      type:Number
  }
    
});


module.exports = mongoose.model('ClassroomSessionResponse', ClassroomSessionResponseSchema);