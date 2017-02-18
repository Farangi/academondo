var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: String,
  desc: String,
  created_at: Date,
});

newsSchema.pre('save', function (next) {
  var news = this;
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('news', newsSchema);