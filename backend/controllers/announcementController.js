const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  const ann = await Announcement.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(ann);
};

exports.getAnnouncements = async (req, res) => {
  const anns = await Announcement.find({
    $or: [{ targetRoles: req.user.role }, { targetRoles: 'all' }]
  }).populate('createdBy', 'name').sort('-createdAt');
  res.json(anns);
};