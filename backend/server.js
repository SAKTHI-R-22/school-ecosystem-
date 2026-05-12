const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initSocket } = require('./socket/socketHandler');

dotenv.config();
connectDB();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/homework', require('./routes/homeworkRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/marks', require('./routes/marksRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

initSocket(io);

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);