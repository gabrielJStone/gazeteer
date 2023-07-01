<?php

	$executionStartTime = microtime(true);

	$url="https://openexchangerates.org/api/latest.json?app_id=c7f7b8501ec9436990567ca917e6331d";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['currencyData'] = $decode['rates'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
