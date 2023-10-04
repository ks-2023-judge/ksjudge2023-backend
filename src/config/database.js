const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(dbConfig);
const Query = async (sql, params, callback) => {
  let conn = await pool.getConnection(async (err, connection) => (err, connection));
  
  const query = await conn.query(sql, params);
  conn.release();

  return query;
};

module.exports = Query;