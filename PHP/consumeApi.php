<?php
    $config = fopen('../config.json', 'r');
    $jsonconfig = fread($config, filesize('../config.json'));
    $apiKey = json_decode($jsonconfig)->apiKey;
    fclose($config);

    $cityCode = "16801";
    $locationSearch = curl_init('http://dataservice.accuweather.com/locations/v1/search?q='.$cityCode.'&apikey='.$apiKey);
    curl_setopt($locationSearch, CURLOPT_HEADER, 0);
    curl_setopt($locationSearch, CURLOPT_RETURNTRANSFER, 1);
    $locationKey = json_decode(curl_exec($locationSearch))[0]->Key;
    curl_close($locationSearch);

    $dataSearch = curl_init('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'.$locationKey.'?apikey='.$apiKey.'&details=true');
    curl_setopt($dataSearch, CURLOPT_HEADER, 0);
    curl_setopt($dataSearch, CURLOPT_RETURNTRANSFER, 1);
    $data = json_decode(curl_exec($dataSearch))[0];
    echo "\n".json_encode($data)."\n";
    curl_close($dataSearch)
?>