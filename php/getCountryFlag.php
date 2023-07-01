<?php

// base url with added query containing ISO code for flag image
$url = "https://flagpedia.net/data/flags/w1160/" . $_REQUEST["iso"] . ".png";

echo $url;

?>
