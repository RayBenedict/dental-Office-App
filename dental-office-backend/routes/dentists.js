const express = require('express');
const {
  getDentists,
  createDentist,
  getDentistById,
  updateDentist,
  deleteDentist,
} = require('../controllers/dentistsController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Get all dentists
router.get('/', getDentists);

// Create a new dentist
router.post('/', authenticateToken, createDentist);

// Get a single dentist by ID
router.get('/:id', getDentistById);

// Update a dentist
router.put('/:id', authenticateToken, updateDentist);

// Delete a dentist
router.delete('/:id', authenticateToken, deleteDentist);

module.exports = router;