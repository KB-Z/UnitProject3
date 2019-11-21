const app = angular.module('prj3ct', []);

app.controller('ProjectController', ['$http', function($http){
  this.loggedInUser = false;
  this.signUpToggle = false;
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
      if (response.data.username) {
        this.loggedInUser = response.data
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

}]);
