'use strict';
const express = require('express');
const router = express.Router();
var test = require('../controllers/test');
//All routes.
router.get('/', (req, res) => { res.send('Server running') });

router.post('/test', test.getList) 
//Export the Router.
module.exports = router;