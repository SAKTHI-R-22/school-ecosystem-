const router = require('express').Router();
const { register, login, getProfile, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.get('/users', protect, getUsers);
module.exports = router;