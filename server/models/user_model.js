'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_code: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  profile: {
    name_first: {
      type: String
    },
    name_last: {
      type: String
    }
  },
  role: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 9] //Student-1,Teacher-2,Principal-3,District Head-4,State Head-5 ,Admin-9
  }, // If `Account` document is required, then move this property to `Account` document.
  email: {
    type: String
  },
  isVerified: {
    type: Boolean
  },
  username: {
    type: String
  },
  passwordHash: {
    type: String
  },
  salt: {
    type: String
  },
  address: {
    type: String
  }

}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */




UserSchema
  .virtual('userRole')
  .get(function () {
    if (this.role == 1) {
      return 'Student';
    }
    if (this.role == 2) {
      return 'Teacher';
    }
    if (this.role == 3) {
      return 'Principal';
    }
    if (this.role == 4) {
      return 'District Head';
    }
    if (this.role == 5) {
      return 'State Head';
    }
    if (this.role == 6) {
      return 'Admin';
    }

  });






/**
 * Methods
 */
UserSchema.methods = {

  /**
   * Authenticate
   *
   * @param {String} password
   * @return {Boolean}
   */
  authenticate: function (password) {
    return this.encryptPassword(password) === this.passwordHash;
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
}

module.exports = mongoose.model('User', UserSchema);
