'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
 
    user_code: {
        type:String
    },
    school_code: {
        type:String
    }, 
    isVerified: {
        type:Boolean
    },
    isInactive: {
        type:Boolean
    }
    
});


module.exports = mongoose.model('Account', AccountSchema);