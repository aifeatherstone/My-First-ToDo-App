var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope, $http){

	$scope.formData ={};

	$http.get('/api/todos').then(function(success){
		$scope.todos = success.data
	})

	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id).then(function(success){
			console.log(success);
			$scope.todos = success.data;
		})
	}

	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData).then(function(success){
			$scope.formData = {};
			$scope.todos = success.data;
		});
	}

	
})