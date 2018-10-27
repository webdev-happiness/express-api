var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
var Comment = new Schema({
    description:{
      type: String,
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

var Comment = mongoose.model('Comment', Comment);
module.exports = Comment;
