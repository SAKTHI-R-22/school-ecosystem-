const onlineUsers = {};

exports.initSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      onlineUsers[userId] = socket.id;
      io.emit('onlineUsers', Object.keys(onlineUsers));
    });

    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      const receiverSocket = onlineUsers[receiverId];
      if (receiverSocket) io.to(receiverSocket).emit('receiveMessage', { senderId, message });
    });

    socket.on('sendNotification', ({ receiverId, notification }) => {
      const receiverSocket = onlineUsers[receiverId];
      if (receiverSocket) io.to(receiverSocket).emit('notification', notification);
    });

    socket.on('disconnect', () => {
      Object.keys(onlineUsers).forEach(k => { if (onlineUsers[k] === socket.id) delete onlineUsers[k]; });
      io.emit('onlineUsers', Object.keys(onlineUsers));
    });
  });
};