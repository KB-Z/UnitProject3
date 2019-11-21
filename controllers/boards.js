const express = require('express');
const router = express.Router();
const Boards = require('../models/boards.js');
const User = require('../models/users.js');
///getting all the projects for showing
router.get('/:userid', (req, res) => {
  // console.log(req);
let x ; // res.json('hi');
  User.findById(req.params.userid, (err,foundUser) => {
  console.log(foundUser.boards);
  });
res.json('afsf');

})

////to create new projects
router.post('/', (req, res) => {
  Boards.create(req.body, (error, createdBoard) => {
      res.json(createdBoard);
  });
})

module.exports = router;
