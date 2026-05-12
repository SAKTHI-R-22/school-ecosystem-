const Marks = require('../models/Marks');

exports.addMarks = async (req, res) => {
  const mark = await Marks.create({ ...req.body, teacher: req.user._id });
  res.status(201).json(mark);
};

exports.getMyMarks = async (req, res) => {
  const marks = await Marks.find({ student: req.user._id }).populate('teacher', 'name');
  res.json(marks);
};

exports.getClassMarks = async (req, res) => {
  const marks = await Marks.find({ class: req.query.class }).populate('student', 'name');
  res.json(marks);
};