const db = require('../config/db');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { user_id, dentist_id, appointment_date } = req.body;

  if (!user_id || !dentist_id || !appointment_date) {
    return res.status(400).json({ error: 'All fields (user_id, dentist_id, appointment_date) are required' });
  }

  try {
    // Check if the appointment slot is already taken
    const existingAppointment = await db('appointments')
      .where({ dentist_id, appointment_date })
      .first();

    if (existingAppointment) {
      return res.status(409).json({ error: 'This appointment slot is already taken' });
    }

    // Insert the new appointment
    await db('appointments').insert({ user_id, dentist_id, appointment_date });
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters

  try {
    // Build the query
    const query = db('appointments')
      .join('users', 'appointments.user_id', 'users.id')
      .join('dentists', 'appointments.dentist_id', 'dentists.id')
      .select(
        'appointments.id',
        'users.name as user_name',
        'dentists.name as dentist_name',
        'appointments.appointment_date',
        'appointments.status',
        'appointments.created_at',
        'appointments.updated_at'
      );

    // If userId is provided, filter by user_id
    if (userId) {
      query.where('appointments.user_id', userId);
    }

    const appointments = await query;

    // Check if appointments exist for the given userId
    if (userId && appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this user' });
    }

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update an appointment
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointment_date, status } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Appointment ID is required' });
  }

  try {
    const updatedRows = await db('appointments')
      .where({ id })
      .update({ appointment_date, status, updated_at: db.fn.now() });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Appointment ID is required' });
  }

  try {
    const deletedRows = await db('appointments').where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};