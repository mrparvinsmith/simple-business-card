angular.module('MyApp')
  .controller('IndexController', IndexController);

IndexController.$inject = ['$http'];

function IndexController($http){
  var self = this;
  self.message = '';
  self.sendEmail = sendEmail;
  self.email = {};

  function sendEmail(){
    if(self.email.recipient){
      $http.post('/email', self.email)
        .then(function(response){
          self.message = 'Thanks! An email has been sent to ' + self.email.recipient;
          self.email = {};
        });
    } else {
      self.message = 'no email entered';
    }
  }
}
