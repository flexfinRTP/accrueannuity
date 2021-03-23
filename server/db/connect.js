const { Pool } = require('pg'); //connect to Postgres db, pool of env variables

const pool = new Pool({ //env variables for Postgres
  user: 'postgres',
  password: '!Launch1',
  host: 'localhost',
  port: 5432,
  database: 'accrue_user'
});

const getClient = async () => { //app is connected to Postgres
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    return null;
  }
};

module.exports = { pool, getClient };