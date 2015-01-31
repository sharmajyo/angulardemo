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
	return $resource('/angulardemo/api/todos.php/todos/:id',{id:"@id"},{update:{method:'PUT'}});
});

TodoApp.filter('dateToISO', function() {
  return function(input) {
    return new Date(input).toISOString();
  };
});

TodoApp.directive('sortProp',function(){
	return {scope:true,
			controller:function($scope,$attr){
				$scope.sort = $attrs.sorted;	
				$scope.isDesc=true;
			}
		}	
});

var ListCtrl= function($scope,$location, Todo){
	$scope.todos=Todo.query();
	
	$scope.sortData=function(value){
		if($scope.sort ==value)
		{
			$scope.isDesc=!$scope.isDesc;
		}
		else
		{
			$scope.isDesc=false;
		}	
		$scope.sort=value;
		$scope.todos=Todo.query({sort:$scope.sort,sortOrder:$scope.isDesc});
	}

	$scope.addNewTodo= function(){
		$location.path('/newTodo');
	}

	$scope.editTodo=function(){
		$location.path('/editTodo/'+this.todo.id);
	}

	$scope.deleteTodo=function(){
		var cId=this.todo.id;
		Todo.delete({ id: cId }, function (){
			$("#trow_"+cId).fadeOut('slow');
		});
	}
}

var createCtrl=function($scope,$location,Todo){
	$scope.item;
	$scope.actionName="Add";	

	$scope.cancelData= function(){
		$location.path('/');
	}

	$scope.addData=function(){
		Todo.save($scope.item,function(){
			$location.path('/');
		});
	}
}

var editCtrl=function($scope,$location,$routeParams,Todo){
	
	$scope.actionName="Update";	
	$scope.item=Todo.get({ id: $routeParams.id });
	
	$scope.$watch('item',function(val,old){
		if(typeof val.priority=="string")
		{
			$scope.item.priority = parseInt(val.priority); 	
		}
       
    },true);

	$scope.cancelData= function(){
		$location.path('/');
	}

	$scope.addData=function(){
		Todo.update({id: $scope.item.id},$scope.item,function(){
				$location.path('/');
			});
	}	
}