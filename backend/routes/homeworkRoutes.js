const router = require('express').Router();
const { createHomework, getHomework, upload } = require('../controllers/homeworkController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
router.use(protect);
router.get('/', getHomework);
router.post('/', authorizeRoles('teacher'), upload.single('attachment'), createHomework);
module.exports = router;