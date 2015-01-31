<?php
include("functions.php");
require 'Slim/Slim.php';
\Slim\Slim::registerAutoLoader();

$app=new \Slim\Slim();
$app->get('/todos', 'getTodos');
$app->get('/todos/:id', 'getTodo');
$app->post('/todos', 'addTodo');
$app->put('/todos/:id', 'updateTodo');
$app->delete('/todos/:id', 'deleteTodo');
$app->run();

function getTodos(){
	try {
        $app=\Slim\Slim::getInstance();
        $req = $app->request();
        
        $sort=$req->get('sort')?$req->get('sort'):'priority';
        $sortOrder=$req->get('sortOrder')?($req->get('sortOrder')=="false"?'DESC':'ASC'):'ASC';

		$items=get_todo_items($sort,$sortOrder);
		echo json_encode($items);
	} catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getTodo($id){
	try {
		echo json_encode(get_todo($id));
	} catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }	
}

function addTodo(){
	$app=\Slim\Slim::getInstance();
	$req = $app->request();
    $app->add(new \Slim\Middleware\ContentTypes());
    $todo = json_decode($req->getBody());
    try {
        create_todo($todo->text,$todo->priority,$todo->dueDate);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateTodo($id){
	$app=\Slim\Slim::getInstance();
	$req = $app->request();
    $app->add(new \Slim\Middleware\ContentTypes());
    $todo = json_decode($req->getBody());

     try {
        update_todo($todo->text,$todo->priority,$todo->dueDate,$todo->id);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteTodo($id){
	try {
		echo json_encode(delete_todo($id));
	} catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>