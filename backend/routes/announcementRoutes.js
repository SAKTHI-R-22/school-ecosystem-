// Developed by Tanya Sri Ganesan 
const router = require('express').Router();
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.get('/', getAnnouncements);
router.post('/', authorizeRoles('admin'), createAnnouncement);
module.exports = router;