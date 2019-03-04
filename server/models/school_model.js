'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
 
    school_code: {
        type:String
    },
    school_name: {
        type:String
    },
    state: {
        type:String
    },
    district: {
        type:String
    }
    
});


module.exports = mongoose.model('School', SchoolSchema);