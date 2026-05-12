const router = require('express').Router();
const { addMarks, getMyMarks, getClassMarks } = require('../controllers/marksController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.get('/my', getMyMarks);
router.get('/class', authorizeRoles('teacher', 'admin'), getClassMarks);
router.post('/', authorizeRoles('teacher'), addMarks);
module.exports = router;
