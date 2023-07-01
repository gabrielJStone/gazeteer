<?php

    $url = "http://api.geonames.org/searchJSON?featureClass=P&country=" . $_REQUEST['iso'] . "&maxRows=100&username=gabrielstone";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL,$url);

    $result=curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result,true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo 'JSON error: ' . json_last_error_msg();
        exit;
    }

    header('Content-Type: application/json; charset=UTF-8');

    $cities = [];

    foreach ($decode["geonames"] as $city) {
        $cityInfo = [
            "name" => $city["toponymName"],
            "lat" => $city["lat"],
            "lng" => $city["lng"],
        ];
        $cities[] = $cityInfo;
    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['allCities'] = $cities;

    echo json_encode($output);

?>