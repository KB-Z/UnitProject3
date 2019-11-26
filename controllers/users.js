const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');
const Board = require('../models/boards.js');

router.get('/', (req, res) => {
	User.find({},(err,foundUser) => {
		console.log(foundUser);
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
	console.log('Entered POST route to create a new user');
	console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log('Creating user with: '+req.body.username);
  User.create(req.body, (error, createdUser) => {
		if (createdUser) {
			console.log('User created: ' + createdUser);
			req.session.user = createdUser;
    	res.json(createdUser);
		} else {
			if(error.code==11000){
				console.log('User exists.Please login');
				res.json(error);
			}else
			console.log(error);
		};

  });
});

router.delete('/:userid', (req, res) => {
	console.log('Entered DELETE route for users');
	console.log('Deleting user id from assigned boards first');
		Board.find({assignedTo:req.params.userid}, (error, foundBoards) => {
			console.log('Entered Board.find');
			if (foundBoards) {
				console.log('Found boards: ' + foundBoards);
				for (let board of foundBoards) {
					let userIdIndex = board.assignedTo.indexOf(req.params.userid);
					console.log('User ID Index: ' + userIdIndex);
					board.assignedTo.splice(userIdIndex, 1);
					board.save();
				};
				console.log('Updated boards: '+ foundBoards);
			} else {
				console.log('Error: ' + error);
				res.json(error);
			}
		});//end of Board.find

	console.log('Deleting User');
	User.findByIdAndRemove(req.params.userid, (error, deletedUser) => {
		console.log('Finding all boards associated with deleted User and removing user');
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
