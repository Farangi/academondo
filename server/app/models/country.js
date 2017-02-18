var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
  country: String
});

module.exports = mongoose.model('country', countrySchema);