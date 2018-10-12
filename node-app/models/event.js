var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
var Event = new Schema({
  date:{
    type: Date,
    default: new Date()
  },
  title:{
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  link:{
    type: String,
    required: true
  },
  visible:{
    type: Boolean,
    default: false
  }
});

var Event = mongoose.model('Event', Event);

module.exports = Event;
