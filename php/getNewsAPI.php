<?php

$api_key = '-EkZ_zpjMJm58qYCiYDABCwgdSL4PmEEZLOgs7Ey_-g';
$iso = $_REQUEST['iso'];

$url = "https://api.newscatcherapi.com/v2/latest_headlines?topic=politics&lang=en&countries=${iso}";

$executionStartTime = microtime(true);

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('x-api-key: ' . $api_key));

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['articles'] = $decode['articles'];

header('Content-Type: application/json; charset=UTF-8');

if ($output['status']['code'] !== "200") {
    echo "cURL Error #:" . $output['status']['code'];
} else {
    echo json_encode($output);
}
?>
