const app = angular.module('prj3ct', []);

app.controller('ProjectController', ['$http', function($http) {
  this.loggedInUser = false;
  this.signUpToggle = false;
  this.message="";
  this.boards = [];
  this.clickedBoardId = "";
  this.boardPartialShow = false; ///to navigate to board partials-'true' is to show
  this.addnewTaskClicked = false;
  this.indexOfEditForm = null;
  this.editBoardValue = false; ///variable to edit the board name
  this.indexOfEditTask = null; //variable to ensure only that task edit is shown
  this.newupdateTaskName = "";
  this.editTaskbtn = false;
  this.indexOfNewTaskfield = null;
  this.showDetails = false;
  this.indexOfBoard = null;
this.profilePartialshow=false;

  this.includePath = 'partials/menu.html'
  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html'
  };
  this.toggleBoardEdit = () => {
    this.editBoardValue = !this.editBoardValue;
  }
  this.toggleProfile = () => {
    this.profilePartialshow = !this.profilePartialshow;
  }


  this.allUsers = () => {
    $http({
      url: `users/`,
      method: 'GET'
    }).then(response => {
      console.log('Received: ' + response.data);
      this.foundUsers = response.data;
    }, error => {
      console.log('Received error: ' + error);
    });
  };
  this.allUsers();

  this.inviteUser = (inviteBoard, invitedUser) => {
    console.log(invitedUser);
    $http({
      url: `boards/invite/${inviteBoard._id}/${invitedUser._id}`,
      method: 'PUT',
      data: {
        board: inviteBoard,
        user: invitedUser
      }
    }).then(response => {
      console.log('Response from inviteUser(): ' + response.data);
      alert(`${invitedUser.username} invited to ${inviteBoard.boardName}!`);
    }, error => {
      console.log('Received error: ' + error);
      alert('Error!');
    });
  };

  this.deleteUser = (user) => {
    $http({
      url: `users/${user._id}`,
      method: 'DELETE'
    }).then(response => {
      this.loggedInUser = false;
    }, error => {
      console.log(error);
      this.loggedInUser = false;
    });
  };

  this.editUser = (user) => {
    $http({
      url: `users/${user._id}`,
      method: 'PUT',
      data: {
        username: this.editUsername
      }
    }).then(response => {
      this.loggedInUser = response.data;
    }, error => {
      console.log(error);
      this.loggedInUser = false;
    });
  };

  this.signUp = () => {
    console.log("inside signup");
    $http({
      url: '/users',
      method: 'POST',
      data: {
        username:this.loginUsername,
        password: this.loginPassword
        //username: this.signupUsername,
      //  password: this.signupPassword,
      }
    }).then((response) => {
			console.log('Received: ' + response.data);
      this.loggedInUser = response.data;
    }, error => {
			console.log('Received error: ' + error);
		});
  }

  this.login = () => {
    console.log("inside login",this.loginUsername);
    $http({
      url: '/sessions',
      method: 'POST',
      data: {
        username: this.loginUsername,
        password: this.loginPassword
      }
    }).then((response) => {
      console.log("in angular session response.data.user", response.data.user);
      console.log('Boards received from response.data.boards: ', response.data.boards);
      if (response.data.user) {
        this.loggedInUser = response.data.user;
        this.boards = response.data.boards;
        this.getBoards();
      } else {
				alert('Invalid Username or Password');
        this.loginUsername = null;
        this.loginPassword = null;
      };
    }, (error) => {
      console.log(error);
    }); //end of $http.then() call
  }; //end of this.login

  this.logout = () => {
    $http({
      url: '/sessions',
      method: 'delete'
    }).then(() => {
      this.loggedInUser = false;
    })
  }
  /////checking for every refresh//////
  $http({
    method: 'GET',
    url: '/sessions'
  }).then((response) => {
    if (response.data.username) {
      this.loggedInUser = response.data;
      this.getBoards();
    }
  });
  ////////////////////////////////////////////////////
  ////////////////boards operations//////////////////////////
  ///////////////////////////////////////////////////////////
  this.getBoards = () => {
    if (this.loggedInUser != false) {


      $http({
        url: '/boards',
        method: 'GET'
      }).then((response) => {
        this.boards = response.data;

        console.table(this.boards);
        // console.log(this.userBoards);
      });
    }
  };

  this.createBoard = () => {
    $http({
      url: '/boards',
      method: 'POST',
      data: {
        boardName: this.newBoardName
      }
    }).then((response) => {
      this.getBoards();
    })
  }
  //////////////you were working on this////////////
  this.editBoardName = (boardid) => {
    console.log("trying to edit the name?", this.updateBoardName);
    $http({
      url: '/boards/update/' + boardid,
      method: 'PUT',
      data: {
        boardName: this.updateBoardName
      }
    }).then((response) => {
      this.getBoards();
      this.indexOfEditForm = null;
      this.editBoardValue = false;
    })


  }

  this.createTask = (board) => {
    $http({
      url: '/boards/addtasks/' + board._id,
      method: 'PUT',
      data: {
        tasks: this.newTaskName
      }
    }).then((response) => {
      this.getBoards();
      this.newTaskName = "";
      this.indexOfNewTaskfield = "";
      this.addnewTaskClicked = false;
    })
  }

  this.editTask = (board, taskid) => {
    console.log("inside task edit", taskid);
    board.tasks[taskid] = this.newupdateTaskName;
    console.log("board object with updated task", board);
    $http({
      url: '/boards/updatetasks/',
      method: 'PUT',
      data: {
        board: board
      }
    }).then((response) => {
      this.getBoards();
      this.newupdateTaskName = "";
      this.editTaskbtn = false;
      this.indexOfEditTask = null;

    });
  }

  this.deleteTask = (boardid, taskid) => {
    console.log("inside task deleteion");
    console.log(boardid, taskid);
    $http({
      url: '/boards/deletetasks/' + boardid + '/' + taskid,
      method: 'DELETE'
    }).then((response) => {
      //  this.getBoards();
    })
  }

  this.deleteBoard = (board) => {
    $http({
      url: `/boards/${board._id}`,
      method: 'DELETE'
    }).then(response => {
      this.getBoards();
    }, error => {
      console.log(error);
    });
  };
  /*=======================
  This is also getting called before the user has a chance
  to login or signup. So it's throwing an error.

  this.getBoards();
  ==================================*/
  //console.log(this.loggedInUser);




}]);
