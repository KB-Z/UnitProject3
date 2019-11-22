const app = angular.module('prj3ct', []);

app.controller('ProjectController', ['$http', function($http){
  this.loggedInUser = false;
  this.signUpToggle = false;
  this.boardsId=[];
  this.includePath = 'partials/menu.html'
  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html'
  };

  this.signUp = () => {
    $http({
      url:'/users',
      method:'POST',
      data: {
        username:this.signupUsername,
        password:this.signupPassword,
        boards: this.boardsId,
        team:this.signupTeam
      }
    }).then((response) => {
      this.loggedInUser = response.data
    })
  }

  this.login = () => {
    $http({
      url:'/sessions',
      method:'POST',
      data: {
        username:this.loginUsername,
        password:this.loginPassword
      }
    }).then((response) => {
      console.log("in angular session response.data.user",response.data.user);
      if (response.data.user.username) {

        this.loggedInUser = response.data.user
      } else {
        this.loginUsername = null;
        this.loginPassword = null;
      }
    },() => {
      console.log(error);
    })
  }

  this.logout = () => {
    $http({
      url:'/sessions',
      method:'delete'
    }).then(() => {
      this.loggedInUser = false;
    })
  }

  $http({
    method:'GET',
    url:'/sessions'
  }).then((response) => {
    if(response.data.username){
      this.loggedInUser = response.data;
    }
  });

  this.getBoards = () => {
    $http({
      url:'/boards',
      method:'GET'
    }).then((response) => {

    })
  }

  this.createBoard = () => {
    $http({
      url:'/boards',
      method:'POST',
      data: {
        boardName:this.newBoardName
      }
    }).then((response) => {
      this.boards = response.data
    })
  }

}]);
