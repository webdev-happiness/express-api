var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
var User = new Schema({
        username: {
          type:String,
          lowercase: true,
          unique: true,
          required: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    // Saves the user's password hashed (plain text password storage is not good)
    User.pre('save', function (next) {
        var user = this;
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                return next(err);
                }
                user.password = hash;
                next();
            });
            });
        } else {
            return next();
        }
    });


    User.methods.comparePassword = function(pw, cb) {
        bcrypt.compare(pw, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }else{
                cb(null, isMatch);
            }
        });
    };


var User = mongoose.model('User', User);

module.exports=User;
