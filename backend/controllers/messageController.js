// Backend developed by Tharanya Ganesan 

const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const msg = await Message.create({ sender: req.user._id, receiver: receiverId, content });
  const populated = await msg.populate(['sender', 'receiver']);
  res.status(201).json(populated);
};

exports.getConversation = async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id }
    ]
  }).populate('sender receiver').sort('createdAt');
  res.json(messages);
};

exports.getContacts = async (req, res) => {
  const messages = await Message.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }]
  }).populate('sender receiver');
  const contactMap = {};
  messages.forEach(m => {
    const other = m.sender._id.toString() === req.user._id.toString() ? m.receiver : m.sender;
    contactMap[other._id] = other;
  });
  res.json(Object.values(contactMap));
};