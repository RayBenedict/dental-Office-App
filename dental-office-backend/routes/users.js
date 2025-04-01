const express = require('express');
const { register, login, getUserById, updateUser } = require('../controllers/usersController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/getById',authenticateToken, getUserById);
router.put('/update', authenticateToken, updateUser);

module.exports = router;