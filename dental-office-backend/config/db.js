const knex = require('knex');
const knexfile = require('../models/knexfile.js');

const db = knex(knexfile[process.env.NODE_ENV || 'development']);

module.exports = db;