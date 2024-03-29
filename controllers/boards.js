const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');

//this router.get finds boards for user in session
router.get('/',(req,res) => {
	console.log('Entered GET route for boards');
	console.log('Using the following user id: ' + req.session.user._id);
	Boards.find({assignedTo:req.session.user._id}, (error, foundBoards) => {
		if (foundBoards) {
			console.log('Found boards: ' + foundBoards);
			res.json(foundBoards);
		} else {
			console.log('No Boards Found!');
			res.json(error);
		};
	});
});
//
// router.get('/:boardId', (req, res) => {
//
//   console.log('Entered GET route for boards');
//   console.log('Using the following board id: ' + req.params.boardId);
//
// 	Boards.findById(req.params.boardId, (error, foundBoard) => {
// 		console.log('found board: ' + foundBoard);
//
// 			res.json(foundBoard);
//
// 	});




//to create new boards
router.post('/', (req, res) => {
  console.log('Entered POST route for boards');
	//req.body should at least be boardName
	//req.body.assignedTo=[req.session.user._id];
	//req.body.assignedTo.push(req.session.user._id);
	Boards.create(req.body, (error, createdBoard) => {
			if (createdBoard) {
				console.log('received:' + req.body.boardName);
				console.log('user id pushed into assignedTo: ' + req.session.user._id);
				console.log(createdBoard);
				createdBoard.assignedTo.push(req.session.user._id);
				console.log('created board:' + createdBoard);
				createdBoard.save();
				res.json(createdBoard);
			} else {
				console.log('Error occurred: ' + error);
				res.json(error);
			};
  });
});

//invite user to a board
router.put('/invite/:boardId/:invitedId', (req, res) => {
	console.log('Entered PUT route for invited user');
	Boards.findById(req.params.boardId, (error, foundBoard) => {
		console.log('found board: ' + foundBoard);
		if (!foundBoard.assignedTo.includes(req.params.invitedId)) {
			console.log('Invited User is not currently included in the board. Pushing user in');
			foundBoard.assignedTo.push(req.params.invitedId);
			foundBoard.save();
			console.log('Updated board saved as: ' + foundBoard);
			res.json(foundBoard);
		} else {
			console.log('User aleady in the board. (or error)...');
			res.json(foundBoard);
		}
	});
});

//update the boardSchema
router.put('/update/:id', (req, res) => {
  Boards.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedBoard) => {
		console.log(updatedBoard);
    res.json(updatedBoard);

  });
});

//add tasks
router.put('/addtasks/:id', (req, res) => {
  console.log(req.body.tasks);
  Boards.findByIdAndUpdate(req.params.id, {
    $push: {
      tasks: req.body.tasks
    }
  }, {
    new: true
  }, (error, updatedBoard) => {
    res.json(updatedBoard);
  });
});

//update Tasks
router.put('/updatetasks/', (req, res) => {
  console.log('Entered Update route for Tasks');
  console.log("whole board object passed", req.body.board);
  console.log('boardid', req.body.board._id);
  Boards.findByIdAndUpdate(req.body.board._id,
    req.body.board, {
      new: true
    },
    (err, updatedtaskBoard) => {
      console.log("entering taskboard");
      updatedtaskBoard.save()
      res.json(updatedtaskBoard);
    });

})

//task deletion
router.delete('/deletetasks/:boardid/:taskid', (req, res) => {
  console.log('Entered DELETE route for Tasks');
  console.log('boardid:', req.params.boardid, 'index of item to be removed:', req.params.taskid);
  Boards.findById(req.params.boardid, (error, taskboard) => {
    console.log('Found board to add task: ' + taskboard);
    taskboard.tasks.splice(req.params.taskid, 1);
    taskboard.save();
    res.json(taskboard);
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
