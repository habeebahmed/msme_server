const express = require('express')
const app = express()
const router = express.Router()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');
const cron = require("node-cron");
var cron_job = require('./cron_job')
//bodyparser for get and post requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Make CORS-enables for all origins.
app.use(cors());

//All routes found here.
app.use('/',routes);

 // schedule tasks to be run on the server 
// var task = cron.schedule("0 23 * * *", function() {
//     console.log("running a task every minute");
//   }, {
//     scheduled: false
//   });
counter = 0;
var task = cron.schedule("* * * * *", function() {
        console.log("running a task every minute "+(++counter));
        cron_job.checkDueDate()
      });
//cron_job.checkDueDate()
//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('Server running on ' + port);


// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )


// field	value
// second	0-59
// minute	0-59
// hour	0-23
// day of month	1-31
// month	1-12 (or names)
// day of week	0-7 (or names, 0 or 7 are sunday)