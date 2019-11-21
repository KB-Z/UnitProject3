const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');
///getting all the boards for refernce
router.get('/', (req, res) => {
  // console.log(req);
Boards.find({},(err,allboards) => {
  res.json(allboards);
})
})
//getting boards based on the user logged in
router.get('/:userid', (req, res) => {
  // console.log(req);
let x ; // res.json('hi');
  User.findById(req.params.userid, (err,foundUser) => {
  console.log(foundUser.boards);
  res.json(foundUser.boards);
  });
})

////to create new boards
router.post('/', (req, res) => {
  Boards.create(req.body, (error, createdBoard) => {
      res.json(createdBoard);
  });
});

//update the boardSchema
router.put('/update/:id', (req, res) => {
    Boards.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedBoard) => {
        res.json(updatedBoard);
    })
});

module.exports = router;
