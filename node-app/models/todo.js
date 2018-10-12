var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
var Todo = new Schema({
    label:{
      type: String,
      required: true
    },
    checked:{
        type: Boolean,
        required: true
    }
});

var Todo = mongoose.model('Todo', Todo);
module.exports = Todo;
