// Developed by Tanya Sri Ganesan 
const router = require('express').Router();
const { createEvent, getEvents, participateEvent, withdrawEvent } = require('../controllers/eventController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.get('/', getEvents);
router.post('/', authorizeRoles('admin', 'teacher'), createEvent);
router.post('/:id/participate', participateEvent);
router.post('/:id/withdraw', withdrawEvent);
module.exports = router;