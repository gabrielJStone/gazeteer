<?php

$lat = $_GET['lat'];
$lng = $_GET['lng'];

$executionStartTime = microtime(true);

$url = 'http://api.geonames.org/timezoneJSON?lat=' . $lat . '&lng=' . $lng . '&username=gabrielstone';

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
$output['timezone'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

if ($output['status']['code'] !== "200") {
    echo "cURL Error #:" . $output['status']['code'];
} else {
    echo json_encode($output);
}

?>