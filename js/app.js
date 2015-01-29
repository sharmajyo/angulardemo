var TodoApp=angular.module("TodoApp",["ngRoute","ngResource"]).
	config(function($routeProvider){
		$routeProvider
			.when('/',
				{
					controller:ListCtrl, 
					templateUrl:'list.html'
				})
			.otherwise(
				{redirectTo:'/'}
				);
	});

TodoApp.factory('Todo',function($resource){
	return $resource('/angulardemo/api/todo.php/:id',{id:"@id"},{getData:{method:"GET",isArray:false}, update:{method:'PUT'}});
});

TodoApp.filter('dateToISO', function() {
  return function(input) {
    return new Date(input).toISOString();
  };
});

var ListCtrl= function($scope,$location, Todo){
	var result=Todo.getData(function(data){
		$scope.todos=result.result_data;
	});
}