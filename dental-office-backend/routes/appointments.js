const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/appointmentsController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, createAppointment);
router.get('/', authenticateToken, getAppointments);

module.exports = router;