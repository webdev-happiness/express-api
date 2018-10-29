var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
var Road = new Schema({
    title:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    waypoints: {
      type: Array
    },
    description: {
      type: String
    },
    routes:{
      type: Array
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

var Road = mongoose.model('Road', Road);

module.exports = Road;
