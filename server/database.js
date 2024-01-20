const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "user_accounts"
});

// `CREATE TABLE accounts (
//   user_id SERIAL PRIMARY KEY,
//   name VARCHAR ( 50 ) UNIQUE NOT NULL,
//   email VARCHAR ( 50 ) UNIQUE NOT NULL,
//   password VARCHAR ( 40 ) NOT NULL,
//   status BOOLEAN DEFAULT true
// );`

module.exports = pool
