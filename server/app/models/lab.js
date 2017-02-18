var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var news = require('./news')

var labSchema = new Schema({
    name: String,
    address: String,
    zip: Number,
    country: String,
    email: String,
    groupLeader: String,
    about: String,
    publications: [String],
    techniques: [String],
    fieldOfInterests: [String],
    created_at: Date
});

labSchema.pre('save', function (next) {
  var lab = this;  
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

    newsDate = currentDate.toLocaleDateString();

    var labNews = new news({
        title: 'Welcome, ' + lab.name + '!',
        desc: 'Thank you for signing up with us! ' + newsDate
    })
    labNews.save();
    next();
});

module.exports = mongoose.model('lab', labSchema);