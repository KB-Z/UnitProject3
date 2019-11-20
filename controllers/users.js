const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

router.get('/', (req, res) => {
	res.send('GET route');
});

router.post('/', (req, res) => {
	res.send('POST route');
});

router.delete('/', (req, res) => {
	res.send('DELETE route');
});

router.put('/', (req, res) => {
	res.send('PUT route');
});

module.exports = router;
