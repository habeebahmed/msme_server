const express = require('express')
const app = express()
const router = express.Router()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');

//bodyparser for get and post requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Make CORS-enables for all origins.
app.use(cors());

//All routes found here.
app.use('/',routes);

//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('Server running on ' + port);