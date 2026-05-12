// Backend developed by Tharanya Ganesan 
const Homework = require('../models/Homework');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
exports.upload = multer({ storage });

exports.createHomework = async (req, res) => {
  const { title, description, class: cls, subject, dueDate } = req.body;
  const hw = await Homework.create({
    teacher: req.user._id, title, description, class: cls, subject, dueDate,
    attachment: req.file ? `/uploads/${req.file.filename}` : null
  });
  res.status(201).json(hw);
};

exports.getHomework = async (req, res) => {
  const filter = req.user.role === 'student' ? { class: req.user.class } :
                 req.user.role === 'teacher' ? { teacher: req.user._id } : {};
  const hw = await Homework.find(filter).populate('teacher', 'name');
  res.json(hw);
};