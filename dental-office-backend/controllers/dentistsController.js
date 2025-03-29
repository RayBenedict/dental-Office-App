const db = require('../config/db');

// Get all dentists
exports.getDentists = async (req, res) => {
  try {
    const dentists = await db('dentists').select('*');
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dentists' });
  }
};

// Create a new dentist
exports.createDentist = async (req, res) => {
  const { name, email, specialization, photo_url } = req.body;

  try {
    await db('dentists').insert({ name, email, specialization, photo_url });
    res.status(201).json({ message: 'Dentist created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create dentist' });
  }
};

// Get a single dentist by ID
exports.getDentistById = async (req, res) => {
  const { id } = req.params;

  try {
    const dentist = await db('dentists').where({ id }).first();
    if (!dentist) {
      return res.status(404).json({ error: 'Dentist not found' });
    }
    res.json(dentist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dentist' });
  }
};

// Update a dentist
exports.updateDentist = async (req, res) => {
  const { id } = req.params;
  const { name, email, specialization, photo_url } = req.body;

  try {
    const updated = await db('dentists').where({ id }).update({ name, email, specialization, photo_url });
    if (!updated) {
      return res.status(404).json({ error: 'Dentist not found' });
    }
    res.json({ message: 'Dentist updated successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update dentist' });
  }
};

// Delete a dentist
exports.deleteDentist = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('dentists').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ error: 'Dentist not found' });
    }
    res.json({ message: 'Dentist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete dentist' });
  }
};