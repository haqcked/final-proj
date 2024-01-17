const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/adduser", (req, res) => {
//   console.log(req.body);
//   res.send("Response received: " + req.body);
// });

// app.post("/adduser", (req, res) => {
//   const name = req.body["name"];
//   const email = req.body["email"];
//   const password = req.body["password"];

//   console.log("name: ", name);
//   console.log("email: ", email);
//   console.log("password: ", password);

//   const insertSTMT = `INSERT INTO accounts ( name, email, password ) VALUES ( '${name}', '${email}', '${password}' );`

//   pool
//     .query(insertSTMT)
//     .then((response) => {
//       console.log("data saved");
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   console.log(req.body)
//   res.send("Response received: " + req.body);
// });

app.get('/', (req, res) => {
  const sql = `SELECT * FROM accounts`;
  // const sql = `SELECT * FROM collections WHERE account_id = 3`;

  pool.query(sql, (err, result) => {
    if(err) return res.json({Message: 'Error in server', err});
    return res.json(result.rows);
  })
})

app.get('/collections', (req, res) => {
  // const sql = `SELECT * FROM accounts`;
  // const sql = `SELECT * FROM public.user_accounts`;
  const sql = `SELECT * FROM collections`;
  // const sql = `SELECT * FROM collections WHERE account_id = 3`;

  pool.query(sql, (err, result) => {
    if(err) return res.json({Message: 'Error in server', err});
    return res.json(result.rows);
  })
})

app.post('/sign-up', (req, res) => {
  const sql = `INSERT INTO accounts (name, email, password) VALUES ($1, $2, $3)`;
  // const sql = `INSERT INTO public.user_accounts (name, email, password) VALUES ($1, $2, $3)`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ];

  pool.query(sql, values, (err, data) => {
    if(err) {
      return res.json(err)
    }
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
  const sql = `SELECT * FROM accounts WHERE email = $1 AND password = $2`;
  const values = [
    req.body.email,
    req.body.password,
  ];

  pool.query(sql, values, (err, data) => {
    if(err) {
      return res.json(err)
    }
    if(data.rows.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  })
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
