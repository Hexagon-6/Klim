<?php  
    include("./consumeApi.php");

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin');
    
    return ('<p>Hello</p>');
?>