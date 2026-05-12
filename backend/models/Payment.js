const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['school_fee', 'exam_fee', 'stationary_fee', 'competition_fee'] },
  amount: Number,
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  month: String,
  year: Number,
}, { timestamps: true });
module.exports = mongoose.model('Payment', paymentSchema);