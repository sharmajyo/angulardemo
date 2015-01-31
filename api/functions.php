<?php
$GLOBALS['connection']=mysqli_connect('localhost','root','','angular_tutorial');

function get_todo_items($sort,$sortOrder){
	$query="select * from todo_table order by $sort $sortOrder";
	$results=mysqli_query($GLOBALS['connection'], $query);

	$result_array=[];
	while($row= $results->fetch_assoc())
	{
		array_push($result_array,$row);
	}

	return $result_array;
}

function create_todo($text,$priority,$dueDate){
	$query="INSERT INTO todo_table (text, dueDate, priority) VALUES ('$text', '$dueDate', $priority)";
	$results=mysqli_query($GLOBALS['connection'], $query);
	return $results;
}

function update_todo($text,$priority,$dueDate,$id){
	$query="UPDATE todo_table set text='$text',dueDate='$dueDate',priority= $priority where id=$id";
	$results=mysqli_query($GLOBALS['connection'], $query);
	return $results;
}

function get_todo($id){
	$query="select * from todo_table where id=$id";
	$results=mysqli_query($GLOBALS['connection'], $query);
	return $results->fetch_assoc();
}

function delete_todo($id){
	$query="delete from todo_table where id=$id";
	$results=mysqli_query($GLOBALS['connection'], $query);
	return $results;
}

?>