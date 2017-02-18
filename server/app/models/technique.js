var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var techniqueSchema = new Schema({
  name: String
});

module.exports = mongoose.model('technique', techniqueSchema);