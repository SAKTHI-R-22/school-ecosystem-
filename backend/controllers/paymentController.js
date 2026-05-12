const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  const { studentId, type, amount, month, year } = req.body;
  const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR', receipt: `rcpt_${Date.now()}` });
  const payment = await Payment.create({
    student: studentId, paidBy: req.user._id, type, amount, month, year,
    razorpayOrderId: order.id, status: 'pending'
  });
  res.json({ orderId: order.id, amount: order.amount, currency: order.currency, paymentId: payment._id, key: process.env.RAZORPAY_KEY_ID });
};

exports.verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = req.body;
  const body = razorpayOrderId + '|' + razorpayPaymentId;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
  if (expected !== razorpaySignature) return res.status(400).json({ message: 'Invalid signature' });
  const payment = await Payment.findByIdAndUpdate(paymentId, { status: 'paid', razorpayPaymentId }, { new: true });
  res.json({ success: true, payment });
};

exports.getPayments = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} :
                 req.user.role === 'parent' ? { paidBy: req.user._id } :
                 { student: req.user._id };
  const payments = await Payment.find(filter).populate('student paidBy', 'name').sort('-createdAt');
  res.json(payments);
};