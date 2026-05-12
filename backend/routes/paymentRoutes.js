const router = require('express').Router();
const { createOrder, verifyPayment, getPayments } = require('../controllers/paymentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.get('/', getPayments);
router.post('/order', authorizeRoles('parent'), createOrder);
router.post('/verify', authorizeRoles('parent'), verifyPayment);
module.exports = router;