angular.module('MyApp')
  .controller('IndexController', IndexController);

IndexController.$inject = ['$http'];

function IndexController($http){
  var self = this;
  self.message = 'hello';
  self.sendEmail = sendEmail;

  function sendEmail(){
    console.log(self.email);
    $http.post('/email', self.email)
      .then(function(response){
        console.log(response);
      });
    self.email = {};
  }
}
