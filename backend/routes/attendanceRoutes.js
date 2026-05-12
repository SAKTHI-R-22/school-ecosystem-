// Developed by Tanya Sri Ganesan 
const router = require('express').Router();
const { markAttendance, getMyAttendance, getClassAttendance } = require('../controllers/attendanceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.get('/my', getMyAttendance);
router.get('/class', authorizeRoles('teacher', 'admin'), getClassAttendance);
router.post('/', authorizeRoles('teacher'), markAttendance);
module.exports = router;