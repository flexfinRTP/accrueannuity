const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '!Launch1',
  host: 'localhost',
  port: 5432,
  database: 'accrue_user'
});

const getClient = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    return null;
  }
};

module.exports = { pool, getClient };
