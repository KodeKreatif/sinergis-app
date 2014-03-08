angular.module("kritingApp")
.config(
  ["$stateProvider", "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise ("/");

    var i = states.length;

    while (i--) {
      var state = states[i];
      $stateProvider.state( state.name, state.options); 
    }
}]);