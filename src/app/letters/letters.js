angular.module("letters", [])
.controller("LettersCtrl", ["$scope", "$http", function ($scope, $http){
  $scope.test = " - This is from LettersCtrl inside the src/app/letters/letters.js";
  $http.get("/api/1/letters").success(function(data) {
    console.log (data);
  }); 
}]);