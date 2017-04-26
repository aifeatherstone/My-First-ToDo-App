var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope, $http){
	$http.get('/api/todos').then(function(success){
		$scope.todos = success.data
	})
})