require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
console.log('route is running:');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');
const dentistRoutes = require('./routes/dentists');

const app = express();
console.log('dentistRoutes:', dentistRoutes);
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dentists', dentistRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});