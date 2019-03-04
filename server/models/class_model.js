'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
 
    school_code: {
        type:String
    },
    class_name: {
        type:String
    },
    class_code: {
        type:String
    },
    class_teacher: {
        type:String
    }, // @Todo: handle multiple teacher if required otherwise let it go.
    students: [{
        type:String
    }] // store enrolled student's IDs in the form of array for a specific class
    
});


module.exports = mongoose.model('Class', ClassSchema);