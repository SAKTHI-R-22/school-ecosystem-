// Backend developed by Tharanya Ganesan 
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find({
    $or: [{ targetRoles: req.user.role }, { targetRoles: 'all' }]
  }).populate('createdBy', 'name').sort('date');
  res.json(events);
};

exports.participateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id,
    { $addToSet: { participants: req.user._id } }, { new: true });
  res.json(event);
};

exports.withdrawEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id,
    { $pull: { participants: req.user._id } }, { new: true });
  res.json(event);
};