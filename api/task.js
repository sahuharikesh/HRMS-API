var connection = require('../config');
const express = require('express');

const router = express.Router();

router.post('/addtask', function (req, res) {
    var task = {
        "tid": req.body.tid,
        "taskname": req.body.taskname,
        "tasktime": req.body.tasktime,
       "pid":req.body.pid
    }

    connection.query('insert into task set ?', task, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({

                status: true,
                data: results,
                message: 'Task added sucessfully'
            })
        }
    });
});

router.get('/taskdetails', function (req, res) {
    connection.query('select * from task ', (error, rows, fields) => {
        if (!error)
            res.send(rows);
        else
            console.log(error);
        1
    });
});

router.get('/taskassign/:tid', (req, res) => {
    connection.query('select * from task where tid= ?', [req.params.tid], (error, rows, fields) => {
        if (!error)
            res.send(rows);
        else
            console.log(error);
    });
});

router.put('/updatedata/:tid', (req, res) => {
    let sql = `update task set taskname= '${req.body.projectname}',tasktime='${req.body.estimatetime}' where tid= '${req.params.tid}'`;
    connection.query(sql, (error, rows, fields) => {
        if (!error)
            res.send('Task updated successfully');
        else
            console.log(error);
    });
});

router.delete('/deletedata/:tid', (req, res) => {
    connection.query('delete from task where tid= ?', [req.params.tid], (error, rows, fields) => {
        if (!error)
            res.send('Task deleted successfully');
        else
            console.log(error);
    });
});

module.exports = router;