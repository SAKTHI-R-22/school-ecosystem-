// Backend developed by Tharanya Ganesan 
const Attendance = require('../models/Attendance');
const User = require('../models/User');

exports.markAttendance = async (req, res) => {
  const { records } = req.body; // [{studentId, status}]
  const date = new Date();
  const created = await Promise.all(records.map(r =>
    Attendance.findOneAndUpdate(
      { student: r.studentId, date: { $gte: new Date(date.setHours(0,0,0,0)) } },
      { student: r.studentId, date, status: r.status, class: req.user.class },
      { upsert: true, new: true }
    )
  ));
  res.json(created);
};

exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({ student: req.user._id }).sort('-date');
  const total = records.length;
  const present = records.filter(r => r.status === 'present').length;
  const percentage = total ? ((present / total) * 100).toFixed(1) : 0;
  res.json({ records, percentage, total, present });
};

exports.getClassAttendance = async (req, res) => {
  const { date, cls } = req.query;
  const filter = {};
  if (date) { const d = new Date(date); filter.date = { $gte: new Date(d.setHours(0,0,0,0)), $lt: new Date(d.setHours(23,59,59,999)) }; }
  if (cls) filter.class = cls;
  const records = await Attendance.find(filter).populate('student', 'name');
  res.json(records);
};