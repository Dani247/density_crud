require('dotenv').config()
const { Pool } = require('pg')
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString,
})

const queryDb = async (query, params) => {
  const client = await pool.connect()
  const res = client.query(query, params);
  await client.release();
  return res;
}

module.exports = { pool, queryDb }