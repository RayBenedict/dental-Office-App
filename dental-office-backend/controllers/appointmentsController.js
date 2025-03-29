const db = require('../config/db');

exports.createAppointment = async (req, res) => {
  const { user_id, dentist_id, appointment_date } = req.body;

  try {
    await db('appointments').insert({ user_id, dentist_id, appointment_date });
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await db('appointments').select('*');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};