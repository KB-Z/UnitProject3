const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');

///getting all the projects for showing
router.get('/:userid', (req, res) => {
	console.log('Entering GET route for boards with user id');
  // console.log(req);
	let x ; // res.json('hi');
  User.findById(req.params.userid, (err,foundUser) => {
		console.log('Found user!');
  	console.log(foundUser.boards);
		res.json('afsf');
  });
});

////to create new boards
router.post('/', (req, res) => {
  console.log('Entered POST route for boards');
	Boards.create(req.body, (error, createdBoard) => {
      console.log('Board created!');
			res.json(createdBoard);
  });
});

//update the boardSchema
router.put('/update/:id', (req, res) => {
  Boards.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedBoard) => {
  	res.json(updatedBoard);
  });
});

module.exports = router;