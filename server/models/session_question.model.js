'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionQuestionSchema = new Schema({

    session_key: {
        type: String
    },
    questions: [{
        type: String
    }]

});


module.exports = mongoose.model('SessionQuestion', SessionQuestionSchema);