const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  venue: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  targetRoles: [String],
}, { timestamps: true });
module.exports = mongoose.model('Event', eventSchema);