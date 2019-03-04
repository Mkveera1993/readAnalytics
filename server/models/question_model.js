'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    question_key: {
        type: String
    },
    options:{
        type:Map
    },
    question_path: {
        type: String
    },
    asked_by: {
        type: String
    },
    asked_at: {
        type: String
    },
    remember: {
        type: String
    },
    difficulty: {
        type: Number
    },
    correct_ans: {
        type: String
    },
    near_correct: {
        type: String
    }

});


module.exports = mongoose.model('Question', QuestionSchema);