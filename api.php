<?php 
    include_once('COS216/PA3/php/General/config.php');

    $database = Database::getInstance();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(!isset($_POST["type"])){
            echo json_encode(failMessage("Type parameter must be set!"));
            return;
        }

        $returnTypes = ["info", "update", "login", "rate", "chat"];
        if(!in_array($_POST["type"], $returnTypes)){
            echo json_encode(failMessage("Type not defined!"));
            return;
        }

        if(!isset($_POST["return"])){
            echo json_encode(failMessage("No return values specified!"));
            return;
        }

        populateDatabase($database);
        
        //echo json_encode($_POST["return"]);
    }    

    function failMessage($message){
        $date = date_create();
        return ["status"=> "failed", "timestamp"=>date_timestamp_get($date), "data"=>["message"=>$message]];
    }

    function getArticle($link = "", $title = "", $author = "", $date = "", $image = "", $tag = "", $description = ""){
        $date = date_create();
        $returnString = ["status"=> "success", "timestamp"=>date_timestamp_get($date), "data"=>[]];
        return $returnString;
    }

    function populateDatabase($database){
        $q = "SELECT TOP 1 * FROM refreshed";
        $r = $database->getConnection()->query($q);
        $Date = strtotime($r);
        //$NewDate = date($Date);
        var_dump($Date);
    }
?>