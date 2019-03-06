'use strict';
const express = require('express');
const router = express.Router();

//All routes.
router.get('/', (req, res) => { res.send('Server running') });

//Export the Router.
module.exports = router;