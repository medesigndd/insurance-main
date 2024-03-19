const express = require('express');
const cors = require('cors');
const pool = require('./server');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



app.post('/customer/get',(req,res) => {
  const name = Object.values(req.body);
  pool.query('SELECT * FROM customer WHERE name = ? LIMIT 1',[name], (error, response) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json({status: 200,message: "Success",data: response});
  });
});



// app.post('/customer/store',(req, res) => {
//   const values = Object.values(req.body);
//   pool.query(`INSERT INTO customer ( name ) VALUES ( ? )`, values, (error, response) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json(response);
//   });
// });

// app.post('/quotation/get',(req,res) => {
//   const customerId = Object.values(req.body);
//   pool.query('SELECT * FROM quotation WHERE customerId = ?',[customerId], (error, response) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     res.json({status: 200,message: "Success",data: response});
//   });
// });

app.post('/quotation/store', (req, res) => {
  const values = Object.values(req.body);
  const columns = Object.keys(req.body).join(', ');
  const placeholders = Object.keys(req.body).fill('?').join(', ');

  pool.query(`INSERT INTO quotation (${columns}) VALUES (${placeholders})`, values, (error, response) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
