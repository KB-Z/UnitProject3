const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

router.get('/', (req, res) => {
	User.find({},(err,foundUser) => {
			res.json(foundUser);
	});

});

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    res.json(createdUser);
  })
});

router.delete('/', (req, res) => {
	res.send('DELETE route');
});

router.put('/', (req, res) => {
	res.send('PUT route');
});

module.exports = router;
