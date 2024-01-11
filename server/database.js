const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "test",
  host: "localhost",
  port: 5432,
  database: "user_accounts"
});

// const pool = new Pool({
//   user: "kuitvchg",
//   password: "7xmYwjw8lU_phpNO-jHxk7mygm6vKbF8",
//   host: "john.db.elephantsql.com",
//   port: 5432,
//   database: "kuitvchg"
// });

// const pool = new Pool({
//   connectionString: 'postgres://kuitvchg:7xmYwjw8lU_phpNO-jHxk7mygm6vKbF8@john.db.elephantsql.com/kuitvchg',
// });

// pool.connect((err, client, done) => {
//   if (err) {
//     console.error('Error connecting to the database', err);
//   } else {
//     console.log('Connected to the database');
//   }
// });



// const createTblQry = `CREATE TABLE accounts (
//   user_id SERIAL PRIMARY KEY,
//   name VARCHAR ( 50 ) UNIQUE NOT NULL,
//   email VARCHAR ( 50 ) UNIQUE NOT NULL,
//   password VARCHAR ( 40 ) NOT NULL,
//   status BOOLEAN DEFAULT true
// );`

// pool
//   .query(createTblQry)
//   .then((response) => {
//     console.log("table created");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = pool
