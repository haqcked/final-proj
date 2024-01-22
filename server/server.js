const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// getting userData
app.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const sql = `SELECT * FROM accounts WHERE email = $1`;

    const result = await pool.query(sql, [email]);
    res.json(result.rows);
  } catch (err) {
    res.json({ Message: 'Error in server', err });
  }
});

// getting the collections based on account_id
app.get('/collections/:accountId', async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const sql = `SELECT * FROM collections WHERE account_id = $1`;

    const result = await pool.query(sql, [accountId]);
    return res.json(result.rows);
  } catch (err) {
    return res.json({ Message: 'Error in server', err });
  }
});

// Add new collection
app.post('/collections', async (req, res) => {
  try {
    const { title, description, account_id } = req.body;
    const sql = `INSERT INTO collections (title, description, account_id) VALUES ($1, $2, $3)`;
    const values = [title, description, account_id];

    await pool.query(sql, values);

    return res.json({ success: true, message: 'Collection added successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Edit a collection
app.put('/collections/:collectionId', async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const { title, description } = req.body;

    const sql = `UPDATE collections SET title = $1, description = $2 WHERE id = $3`;
    const values = [title, description, collectionId];

    await pool.query(sql, values);

    return res.json({ success: true, message: 'Collection updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});


// Delete a collection
app.delete('/collections/:collectionId', async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const sql = `DELETE FROM collections WHERE id = $1`;

    await pool.query(sql, [collectionId]);

    return res.json({ success: true, message: 'Collection deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});


app.post('/sign-up', (req, res) => {
  const sql = `INSERT INTO accounts (name, email, password) VALUES ($1, $2, $3)`;
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
