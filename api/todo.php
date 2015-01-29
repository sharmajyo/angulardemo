<?php
header("Content-Type:application/json");
include("functions.php");

$items=get_todo_items();

if(empty($items))
{
	deliver_response('200','No data',NULL);
}
else
{
	deliver_response('200','success',$items);
}

function deliver_response($status,$status_msg,$data){
	header("HTTP/1.1 $status $status_msg");
	$response['status']=$status;
	$response['status_msg']=$status_msg;
	$response['result_data']=$data;

	$json_response=json_encode($response);

	echo $json_response;
}
?>