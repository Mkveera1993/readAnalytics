'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSessioSchema = new Schema({
 
    session_key: {
        type:String
    },
    school_code: {
        type:String
    },
    title:{
        type:String
    },
    start_time: {
        type:Date
    },
    end_time: {
        type:Date
    },
    session_duration: {
        type:Date
    },
    for_class: {
        type:String
    },
    subject: {
        type:String
    },
    sub_subject: {
        type:String
    },
    class_teacher: {
        type:String
    },
    question_asked: [{
        type:String
    }],
    read_velocity: {
        type:Number
    },
    session: {
        type:Number
    }, // session: fields displayed at UI @Discuss
    topic: {
        type:Number
    }, // topic: fields displayed at UI  @Discuss
    total_responses: {
        type:Number
    },
    attendance: {
      absent: {
          type:Number
      },
      present: {
          type:Number
      }
    },
    students: [{
        type:String
    }] // @Discuss
    
});


module.exports = mongoose.model('ClassroomSession', ClassroomSessioSchema);