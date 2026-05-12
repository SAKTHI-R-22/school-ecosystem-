// Developed by Tanya Sri Ganesan 
const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  status: { type: String, enum: ['present', 'absent', 'late'] },
  class: String,
}, { timestamps: true });
module.exports = mongoose.model('Attendance', attendanceSchema);