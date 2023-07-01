<?php

$lat = $_GET['lat'];
$lng = $_GET['lng'];

$url = "http://api.geonames.org/countryCode?lat=" . $lat . "&lng=" . $lng . "&username=gabrielstone";

$iso = file_get_contents($url);

if (!$iso) {
    echo 'Error with data';
}

// returns iso code
echo json_encode($iso);

?>