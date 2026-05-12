// Developed by Tanya Sri Ganesan 
const mongoose = require('mongoose');
const marksSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  examType: String,
  marks: Number,
  totalMarks: Number,
  class: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
module.exports = mongoose.model('Marks', marksSchema);