<?php

$curl = curl_init();

$url = "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" . $_REQUEST['lat'] . '%2C' . $_REQUEST['lng'] . "&days=3";

curl_setopt_array($curl, [
	CURLOPT_URL => $url,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: weatherapi-com.p.rapidapi.com",
		"X-RapidAPI-Key: c6420e7d84msh411a5b2e2392444p160debjsnfbd4797b5da7"
	],
]);

$response = curl_exec($curl);
$decode = json_decode($response,true);	
$err = curl_error($curl);

curl_close($curl);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['weatherData']['forecast'] = $decode['forecast']['forecastday'];

if ($output['status']['code'] !== "200") {
	echo "cURL Error #:" . $output['status']['code'];
} else {
	echo json_encode($output);
}
