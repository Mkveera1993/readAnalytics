'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
 
    session_key: {
        type:String
    },
    start_time: {
        type:Date
    },
    title:{
        type:String
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
    studio_name: {
        type:String
    },
    studio_teacher: {
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
    }, 
    topic: {
        type:Number
    },
    
});


module.exports = mongoose.model('StudioSession', SessionSchema);