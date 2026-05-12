// Backend developed by Tharanya Ganesan 

const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
  const leave = await Leave.create({ student: req.user._id, ...req.body });
  res.status(201).json(leave);
};

exports.getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ student: req.user._id }).sort('-createdAt');
  res.json(leaves);
};

exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find().populate('student', 'name class').sort('-createdAt');
  res.json(leaves);
};

exports.updateLeave = async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(req.params.id,
    { status: req.body.status, reviewedBy: req.user._id }, { new: true });
  res.json(leave);
};