<?php

$url = "./countryBorders.geo.json";

$json = file_get_contents($url);

// Parse the JSON response
$result = json_decode($json, true);

// logs error message if error
if (json_last_error() !== JSON_ERROR_NONE) {
    echo 'JSON error: ' . json_last_error_msg();
    exit;
}

header('Content-Type: application/json; charset=UTF-8');

$countries = [];

foreach ($result["features"] as $feature) {
    $country = [
        "name" => $feature["properties"]["name"],
        "code" => $feature["properties"]["iso_a2"]
    ];
    $countries[] = $country;
}
$output['countries'] = $countries;

echo json_encode($output);

?>