var app = angular.module("kritingApp", ["ui.router", "letters", "home"])
.run( 
  [ "$rootScope", "$state", "$stateParams",      
  function ($rootScope, $state, $stateParams) {

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

