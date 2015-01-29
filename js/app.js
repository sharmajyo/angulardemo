var TodoApp=angular.module("TodoApp",["ngRoute","ngResource"]).
	config(function($routeProvider){
		$routeProvider
			.when('/',
				{
					controller:ListCtrl, 
					templateUrl:'list.html'
				})
			.when('/newTodo',
				{
					controller:createCtrl,
					templateUrl:'addtodo.html'
				})
			.when('/editTodo/:id',
				{
					controller:editCtrl,
					templateUrl:'addtodo.html'
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

		$scope.addNewTodo= function(){
			$location.path('/newTodo');
		}

		$scope.editTodo=function(){
			$location.path('/editTodo/'+this.todo.id);
		}

		$scope.deleteTodo=function(){
			$("#trow_"+this.todo.id).fadeOut('slow');
		}
	}

var createCtrl=function($scope,$location){
	$scope.item;
	$scope.actionName="Add";	

	$scope.cancelData= function(){
		$location.path('/');
	}

	$scope.addData=function(){

	}
}

var editCtrl=function($scope,$location,$routeParams){
	$scope.actionName="Update";	
	/*$scope.item=Todo.get({ id: $routeParams.itemId });*/

	$scope.cancelData= function(){
		$location.path('/');
	}
}