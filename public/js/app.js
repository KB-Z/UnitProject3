const app = angular.module('prj3ct', []);

app.controller('ProjectController', ['$http', function($http) {
  this.loggedInUser = false;
  this.signUpToggle = false;
  this.boards = [];
  this.newupdateTaskName="";
  this.includePath = 'partials/menu.html'
  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html'
  };

	this.allUsers = () => {
		$http({
			url:`users/`,
			method: 'GET'
		}).then( response => {
			console.log('Received: ' + response.data);
			this.foundUsers = response.data;
		}, error => {
			console.log('Received error: ' + error);
		});
	};
	this.allUsers();

	this.inviteUser = (inviteBoard, invitedUser) => {
		$http({
			url:`boards/invite/${inviteBoard._id}/${invitedUser._id}`,
			method:'PUT',
			data: {
				board: inviteBoard,
				user: invitedUser
			}
		}).then( response => {
			console.log('Response from inviteUser(): ' + response.data);
			alert(`${invitedUser.username} invited to ${inviteBoard.boardName}!`);
		}, error => {
			console.log('Received error: ' + error);
			alert('Error!');
		});
	};

	this.deleteUser = (user) => {
		$http({
			url:`users/${user._id}`,
			method:'DELETE'
		}).then( response => {
			this.loggedInUser = false;
		}, error => {
			console.log(error);
			this.loggedInUser = false;
		});
	};

	this.editUser = (user) => {
		$http({
			url:`users/${user._id}`,
			method:'PUT',
			data: {
				username: this.editUsername
			}
		}).then( response => {
			this.loggedInUser = response.data;
		}, error => {
			console.log(error);
			this.loggedInUser = false;
		});
	};

  this.signUp = () => {
    $http({
      url: '/users',
      method: 'POST',
      data: {
        username: this.signupUsername,
        password: this.signupPassword,
        boards: this.boardsId,
        team: this.signupTeam
      }
    }).then((response) => {
      this.loggedInUser = response.data
    })
  }

  this.login = () => {
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
      if (response.data.user.username) {
        this.loggedInUser = response.data.user;
        this.boards = response.data.boards;
        this.getBoards();
      } else {
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
	
  $http({
    method: 'GET',
    url: '/sessions'
  }).then((response) => {
    if (response.data.username) {
      this.loggedInUser = response.data;
    }
  });
  
	this.getBoards = () => {
    $http({
      url: '/boards',
      method: 'GET'
    }).then((response) => {
      this.boards = response.data;
      // angular.forEach(response.data, (boards) => {
      //   console.log('Assigned ID from board' + boards.assignedTo);
      //   console.log('Assigned Task(s) from board' + boards.tasks);
      //   this.userBoards = boards.assignedTo
      // });
      console.table(this.boards);
      // console.log(this.userBoards);
    });
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

  this.createTask = (board) => {
    //console.log(board);
    $http({
      url: '/boards/addtasks/' + board._id ,
      method: 'PUT',
      data: {
        tasks: this.newTaskName
      }
    }).then((response) => {
      this.getBoards();
    })
  }

  this.editTask = (board, taskid) => {
    console.log("inside task edit");
    board.tasks[taskid] = this.newupdateTaskName;
    console.log("board object with updated task",board);
    $http({
      url:'/boards/updatetasks/' ,
      method:'PUT',
      data:{
        board:board
      }
    }).then((response) => {
    	this.getBoards();
    })
  }

  this.deleteTask = (boardid, taskid) => {
    console.log("inside task deleteion");
    console.log(boardid, taskid);
    $http({
      url:'/boards/deletetasks/' + boardid+'/'+taskid,
      method:'DELETE'
    }).then((response) => {
    	this.getBoards();
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

}]);
