const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '!Launch1',
  host: 'localhost',
  port: 5432,
  database: 'accrue_user'
});

module.exports = { pool };
