var connection = require('../config');
const express = require('express');

const router = express.Router();

router.post('/leaveapply', function (req, res) {
    var leavereq = {
        "lid":req.body.lid,
        "newleave": req.body.newleave,
        "date":req.body.date,
       "uid":req.body.uid
    }

    connection.query('insert into leavereq set ?', leavereq, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({

                status: true,
                data: results,
                message: 'New leave applied sucessfully'
            })
        }
    });
});


// router.get('/taskassign/:tid', (req, res) => {
//     connection.query('select * from task where tid= ?', [req.params.tid], (error, rows, fields) => {
//         if (!error)
//             res.send(rows);
//         else
//             console.log(error);
//     });
// });

router.put('/updateleave/:lid', (req, res) => {
    let sql = `update leavereq set newleave= '${req.body.newleave}',date='${req.body.date}' where lid= '${req.params.lid}'`;
    connection.query(sql, (error, rows, fields) => {
        if (!error)
            res.send('Leave updated successfully');
        else
            console.log(error);
    });
});

// router.delete('/deleteleave/:lid', (req, res) => {
//     connection.query('delete from leavereq where lid= ?', [req.params.lid], (error, rows, fields) => {
//         if (!error)
//             res.send('Leave deleted successfully');
//         else
//             console.log(error);
//     });
// });

module.exports = router;