<?php
$GLOBALS['connection']=mysqli_connect('localhost','root','','angular_tutorial');

function get_todo_items(){
	$query="select * from todo_table";
	$results=mysqli_query($GLOBALS['connection'], $query);

	$result_array=[];
	while($row= $results->fetch_assoc())
	{
		array_push($result_array,$row);
	}

	return $result_array;
}


?>