// Developed by Tanya Sri Ganesan 
const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetRoles: [String],
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
}, { timestamps: true });
module.exports = mongoose.model('Announcement', announcementSchema);