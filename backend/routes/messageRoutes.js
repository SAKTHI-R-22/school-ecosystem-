// Developed by Tanya Sri Ganesan 
const router = require('express').Router();
const { sendMessage, getConversation, getContacts } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
router.use(protect);
router.post('/', sendMessage);
router.get('/contacts', getContacts);
router.get('/:userId', getConversation);
module.exports = router;