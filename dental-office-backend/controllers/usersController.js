const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db('users').insert({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token is required' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract the user ID from the token

    // Fetch the user by ID
    const user = await db('users').where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.body; // Extract the user ID from the request body
  const { name, email, password } = req.body; // Extract fields to update

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Prepare the update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10); // Hash the new password

    // Update the user in the database
    const updatedRows = await db('users').where({ id }).update(updateData);

    if (updatedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};