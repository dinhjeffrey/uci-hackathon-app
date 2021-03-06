/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt')

// ************************ Create a new user ************************
module.exports = {
    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: 'string',
            required: true
        },
        username: {
        	type: 'string',
        	required: true,
        	unique: true,
        	lowercase: true
        }, 
        toJSON: function() {
            var obj = this.toObject();
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};


