const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');
<<<<<<< HEAD
///getting all the boards for refernce
router.get('/', (req, res) => {
  // console.log(req);
Boards.find({},(err,allboards) => {
  res.json(allboards);
})
})
//getting boards based on the user logged in
=======

///getting all the projects for showing
>>>>>>> a589071b1b9c3fc1da1d637de4467e42c5c10322
router.get('/:userid', (req, res) => {
	console.log('Entering GET route for boards with user id');
  // console.log(req);
	let x ; // res.json('hi');
  User.findById(req.params.userid, (err,foundUser) => {
<<<<<<< HEAD
  console.log(foundUser.boards);
  res.json(foundUser.boards);
  });
})
=======
		console.log('Found user!');
  	console.log(foundUser.boards);
		res.json('afsf');
  });
});
>>>>>>> a589071b1b9c3fc1da1d637de4467e42c5c10322

////to create new boards
router.post('/', (req, res) => {
  console.log('Entered POST route for boards');
	Boards.create(req.body, (error, createdBoard) => {
      console.log('Board created!');
			res.json(createdBoard);
  });
});
<<<<<<< HEAD

//update the boardSchema
router.put('/update/:id', (req, res) => {
    Boards.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedBoard) => {
        res.json(updatedBoard);
    })
});
=======
>>>>>>> a589071b1b9c3fc1da1d637de4467e42c5c10322

module.exports = router;
