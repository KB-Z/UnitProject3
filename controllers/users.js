const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

router.get('/', (req, res) => {
	User.find({},(err,foundUser) => {
			res.json(foundUser);
	});
});

///getting all the projects for showing
router.get('/:userid', (req, res) => {
	console.log('Entering GET route for users with user id');
  User.findById(req.params.userid, (err,foundUser) => {
		console.log('Found user: ' + foundUser);
		res.json(foundUser);
  });
});

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    res.json(createdUser);
  });
});

router.delete('/:userid', (req, res) => {
	console.log('Entered DELETE route for users');
	User.findByIdAndRemove(req.params.userid, (error, deletedUser) => {
		console.log('Found User & deleting: ' + deletedUser);
		res.json(deletedUser);
	});
});

router.put('/:userid', (req, res) => {
	console.log('Entered PUT route for users');
	User.findByIdAndUpdate(req.params.userid, req.body, {new:true}, (error, updatedUser) => {
		console.log('Found User and updated to: ' + updatedUser);
		res.json(updatedUser);
	});
});

module.exports = router;
