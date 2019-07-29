var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var Users = require('./api/users');
var Projects = require('./api/project');
var Attendance = require('./api/attendance');
var Task=require('./api/task');
var Activity=require('./api/activity');
var Leavereq=require('./api/leavereq');
var Leavedet=require('./api/leavedetails');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* route to handle login */
app.use('/user', Users);
app.use('/project', Projects);
app.use('/attendance', Attendance);
app.use('/task', Task);
app.use('/activity', Activity);
app.use('/leaverequest', Leavereq);
app.use('/leaveinfo', Leavedet);

app.listen(5000);