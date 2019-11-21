const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');

router.get('/',(req,res) => {
	Boards.find({},(err,allBoards) => {
		res.json(allBoards);
	})
})

//to create new boards
router.post('/', (req, res) => {
  console.log('Entered POST route for boards');
	//req.body should at least be boardName
	Boards.create(req.body, (error, createdBoard) => {
			console.log('received:' + req.body);
			console.log('user id pushed into assignedTo: ' + req.session.user._id);
			createdBoard.assignedTo.push(req.session.user.id);
			console.log('created board:' + createdBoard);
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
