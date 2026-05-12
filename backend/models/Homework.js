const mongoose = require('mongoose');
const homeworkSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  class: String,
  subject: String,
  dueDate: Date,
  attachment: String,
}, { timestamps: true });
module.exports = mongoose.model('Homework', homeworkSchema);