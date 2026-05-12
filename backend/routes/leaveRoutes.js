const router = require('express').Router();
const { applyLeave, getMyLeaves, getAllLeaves, updateLeave } = require('../controllers/leaveController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.post('/', authorizeRoles('student'), applyLeave);
router.get('/my', getMyLeaves);
router.get('/', authorizeRoles('teacher', 'admin'), getAllLeaves);
router.patch('/:id', authorizeRoles('teacher', 'admin'), updateLeave);
module.exports = router;