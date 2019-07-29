var connection = require('../config');
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/addusers', function (req, res) {
  var users = {
    "fname": req.body.fname,
    "lname": req.body.lname,
    "email": req.body.email,
    "mobile": req.body.mobile,
    "address": req.body.address,
    "password": req.body.password
  }
  var use = users;
  const key = crypto.pbkdf2Sync(use.password, 'salt', 100, 10, 'sha512');
  use.password = key.toString("hex");
  connection.query('insert into users set ?', use, function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query'
      })
    } else {
      res.json({

        status: true,
        data: results,
        message: 'User added sucessfully'
      })
    }
  });
});

router.get('/getdata', function (req, res) {
  connection.query('select * from users', (error, rows, fields) => {
    if (!error)
      res.send(rows);
    else
      console.log(error);
  });
});

router.get('/getdata/:uid', (req, res) => {
  connection.query('select * from users where uid= ?', [req.params.uid], (error, rows, fields) => {
    if (!error)
      res.send(rows);
    else
      console.log(error);
  });
});
 

router.put('/updatedata/:uid', (req, res) => {
  let sql = `update users set fname= '${req.body.fname}',lname= '${req.body.lname}',email='${req.body.email}',
 mobile= '${req.body.mobile}',address= '${req.body.address}' where uid= '${req.params.uid}'`;
  connection.query(sql, (error, rows, fields) => {
    if (!error)
      res.send('Updated successfully');
    else
      console.log(error);
  });
});

router.delete('/deletedata/:uid', (req, res) => {
  connection.query('delete from users where uid= ?', [req.params.uid], (error, rows, fields) => {
    if (!error)
      res.send('User deleted successfully');
    else
      console.log(error);
  });
});

module.exports = router;