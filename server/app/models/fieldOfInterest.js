var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fieldOfInterestSchema = new Schema({
  name: String,
  desc: String
});

module.exports = mongoose.model('fieldOfInterest', fieldOfInterestSchema);