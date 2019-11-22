const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');

//this router.get finds boards for user in session
router.get('/',(req,res) => {
	console.log('Entered GET route for boards');
	console.log('Using the following user id: ' + req.session.user._id);
	Boards.find({assignedTo:req.session.user._id}, (error, foundBoards) => {
		console.log('Found boards: ' + foundBoards);
		res.json(foundBoards);
	})
})

// Test route to get ALL Boards for debuggin purposes -Zach
// router.get('/', (req,res) => {
// 	Boards.find((error, allBoards) => {
// 		// console.log('debugging...' + allBoards );
// 		res.json(allBoards);
// 	})
// })

//to create new boards
router.post('/', (req, res) => {
  console.log('Entered POST route for boards');
	//req.body should at least be boardName
	req.body.assignedTo=[req.session.user._id];
	//req.body.assignedTo.push(req.session.user._id);
	Boards.create(req.body, (error, createdBoard) => {
			console.log('received:' + req.body.boardName);
			console.log('user id pushed into assignedTo: ' + req.session.user._id);
			createdBoard.assignedTo.push(req.session.user._id);
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

//update the boardSchema
router.put('/updatetasks/:id', (req, res) => {
	console.log(req.body.tasks);
  Boards.findByIdAndUpdate(req.params.id, {$push:{tasks:req.body.tasks}}, {new:true}, (error, updatedBoard) => {
  	res.json(updatedBoard);
  });
});

//task deletion
router.delete('/deletetasks/:boardid/:taskid',(req,res) => {
	console.log('Entered DELETE route for Tasks');
	console.log('boardid',req.params.boardid,'index of item to be removed',req.params.taskid);
	Boards.findById(req.params.boardid, (error, taskboard) => {
		console.log('Found board to add task: ' + taskboard);
		taskboard.tasks.splice(req.params.taskid,1);
	taskboard.save();
	});
})


router.delete('/:id', (req, res) => {
	console.log('Entered DELETE route for Boards');
	Boards.findByIdAndRemove(req.params.id, (error, deletedBoard) => {
		console.log('Found and deleting board: ' + deletedBoard);
		res.json(deletedBoard);
	});
});

module.exports = router;
