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

// getting all user accounts
app.get('/accounts', async (req, res) => {
  try {
    const sql = 'SELECT * FROM accounts';
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in server:', err);
    res.status(500).json({ Message: 'Error in server', error: err.message });
  }
});

// updating user account status to Active/Blocked
app.put('/update-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const sql = 'UPDATE accounts SET status = $1 WHERE ID = $2';
    const result = await pool.query(sql, [status, id]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.json({ Message: 'Error in the server' });
  }
});

// delete single/multiple user account
app.delete('/delete-multiple', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ Message: 'Invalid request. Please provide an array of userdata IDs to delete.' });
    }

    const sql = 'DELETE FROM accounts WHERE ID = ANY($1)';
    const result = await pool.query(sql, [ids]);

    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: 'Error in the server' });
  }
});

// getting the all collections
app.get('/collections', async (req, res) => {
  try {
    const sql = `SELECT * FROM collections`;

    const result = await pool.query(sql);
    return res.json(result.rows);
  } catch (err) {
    return res.json({ Message: 'Error in server', err });
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
    const {
      title,
      description,
      account_id,
      custom_string1_state,
      custom_string1_name,
      custom_string2_state,
      custom_string2_name,
      custom_string3_state,
      custom_string3_name,
    } = req.body;

    const sql = `
      INSERT INTO collections (
        title,
        description,
        account_id,
        custom_string1_state,
        custom_string1_name,
        custom_string2_state,
        custom_string2_name,
        custom_string3_state,
        custom_string3_name
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const values = [
      title,
      description,
      account_id,
      custom_string1_state,
      custom_string1_name,
      custom_string2_state,
      custom_string2_name,
      custom_string3_state,
      custom_string3_name,
    ];

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
    const {
      title,
      description,
      custom_string1_state,
      custom_string1_name,
      custom_string2_state,
      custom_string2_name,
      custom_string3_state,
      custom_string3_name,
    } = req.body;

    const sql = `
      UPDATE collections
      SET
        title = $1,
        description = $2,
        custom_string1_state = $3,
        custom_string1_name = $4,
        custom_string2_state = $5,
        custom_string2_name = $6,
        custom_string3_state = $7,
        custom_string3_name = $8
      WHERE id = $9
    `;

    const values = [
      title,
      description,
      custom_string1_state,
      custom_string1_name,
      custom_string2_state,
      custom_string2_name,
      custom_string3_state,
      custom_string3_name,
      collectionId,
    ];

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

// SIGN UP
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

// LOGIN
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
