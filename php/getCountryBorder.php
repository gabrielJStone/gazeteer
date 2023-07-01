<?php

$iso_code = $_GET['iso_code'];

$url = "./countryBorders.geo.json";

$json = file_get_contents($url);

// Parse the JSON response
$result = json_decode($json, true);

// logs error message if error
if (json_last_error() !== JSON_ERROR_NONE) {
    echo 'JSON error: ' . json_last_error_msg();
    exit;
}

// iterates through objects in json file and assigns
foreach ($result["features"] as $feature) {
    $iso = $feature["properties"]["iso_a2"];

    // if iso code matches with url parameters, use geometry from that iso
    if ($iso == $iso_code) {
        $geometry = $feature["geometry"];

        header('Content-Type: application/json; charset=UTF-8');

        // return correct geometry data
        echo json_encode($geometry);
        break;
    }

}

?>

    



