const app = angular.module('Proj3ct', []);

app.controler('ProjectController', ['$http', function($http){
  this.loggedInUser = false;

  this.signUp = () => {
  $http({
    url:'/users',
    method:'POST',
    data: {
      username:this.signupUsername,
      password:this.signupPassword
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
      // this.loginUsername = null;
      // this.loginPassword = null;
    }
  },() => {
    console.log(error);
  })
}

this.logout = () => {
  $http({
    url:'/project',
    method:'delete'
  }).then(() => {
    this.loggedInUser = false;
  })
}

}]);
