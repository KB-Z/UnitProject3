const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');
const Boards = require('../models/boards.js');

router.post('/', (req, res) => {
  console.log('Entered POST route for sessions');
  User.findOne({username:req.body.username}, (err, foundUser) => {
    console.log('Entered User.findOne function');
    
		if (foundUser === null) {
      console.log('Unable to find a user');
      res.json({message: 'user not found', status: 401});
    } else {
      console.log('Found a user. Checking password...');
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
      
			if (doesPasswordMatch) {
        console.log('Match. Assigning req.session.user to found user');
        req.session.user = foundUser;
				console.log("userId in sessions:", req.session.user.id);
        //res.json(foundUser);
        ///getting the boards tied with the user////////
        //foundUser="5dd6df85bc92ba84d7317bb3"
        
				Boards.find({assignedTo:foundUser.id}, (err, userBoards) => {
          if(err){res.json(err);} //checking for errors
          
					console.log('Boards sent to frontend: ' + userBoards);
					//return to Front-End with user & boards
          res.json({user:foundUser,boards:userBoards});
        });

      } else {
        console.log('error!');
        res.json({message: 'failed login'});
      };
    };// end of first if/else statement
  });//end of User.findOne function
});//end of router.post function

router.get('/', (req, res) => {
  console.log('Entering GET route for sessions');
  res.json(req.session.user);
});

router.delete('/', (req, res) => {
  console.log('Entering DELETE route for sessions');
  req.session.destroy(() => {
    console.log('Session destroyed');
    res.json({
      destroyed: true
    });
  });
});

module.exports = router;
