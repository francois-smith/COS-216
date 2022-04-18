<?php
    if(!isset($_SESSION)){
        session_start();
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $validated = true;
        $name = $_POST["name"];
        $surname = $_POST["password"];
        
        include("config.php");
        $instance = Database::getInstance();
        $instance->retrieveUser($name, $surname);
    }
?>