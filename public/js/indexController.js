angular.module('MyApp')
  .controller('IndexController', IndexController);

function IndexController(){
  var self = this;
  self.message = 'hello';
}
