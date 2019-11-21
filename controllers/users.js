const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

router.get('/', (req, res) => {
	console.log('Entered GET route for users');
	User.find({},(err,foundUser) => {
		console.log('Found a user!');
			res.json(foundUser);
	});

});

router.post('/', (req, res) => {
	console.log('Entered POST route for users');
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
		console.log('Created a user!');
    res.json(createdUser);
  });
});

router.delete('/', (req, res) => {
	console.log('Entered DELETE route for users');
	res.send('DELETE route');
});

router.put('/', (req, res) => {
	console.log('Entered PUT route for users');
	res.send('PUT route');
});

module.exports = router;
