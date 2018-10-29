var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
var Post = new Schema({
    title:{
      type: String,
      required: true
    },
    public:{
        type: Boolean,
        default: true
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    thumbnail: {
        type: String
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    like: {
        type: Number,
        default: 0
    }
});

var Post = mongoose.model('Post', Post);
module.exports = Post;
