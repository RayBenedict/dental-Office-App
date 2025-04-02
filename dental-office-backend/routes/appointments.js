const express = require('express');
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentsController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new appointment
router.post('/', authenticateToken, createAppointment);

// Get all appointments
router.get('/', authenticateToken, getAppointments);

// Get appointments for a specific user by userId
router.get('/user/:userId', authenticateToken, getAppointments);

// Update an appointment by ID
router.put('/:id', authenticateToken, updateAppointment);

// Delete an appointment by ID
router.delete('/:id', authenticateToken, deleteAppointment);

module.exports = router;