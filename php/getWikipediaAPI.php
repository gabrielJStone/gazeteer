<?php

$country = $_GET['countryName'];

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://wiki-briefs.p.rapidapi.com/search?q=${country}&topk=1",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: wiki-briefs.p.rapidapi.com",
		"X-RapidAPI-Key: c6420e7d84msh411a5b2e2392444p160debjsnfbd4797b5da7"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}

?>