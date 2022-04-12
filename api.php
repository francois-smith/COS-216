<?php 
    include_once('COS216/PA3/php/General/config.php');

    $database = Database::getInstance();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(!isset($_POST["type"])){
            echo json_encode(failMessage("Type parameter must be set"));
            return;
        }

        $requestTypes = ["info", "update", "login", "rate", "chat"];
        if(!in_array($_POST["type"], $requestTypes)){
            echo json_encode(failMessage("Type not defined"));
            return;
        }

        if(!isset($_POST["return"])){
            echo json_encode(failMessage("No return values specified"));
            return;
        }

        $returnTypes = ["title", "author", "date", "rating"];
        if(empty(array_intersect($returnTypes, $_POST["return"]))){
            echo json_encode(failMessage("Wrong return value specified"));
            return;
        }

        switch ($_POST["type"]) {
            case "info":
                getArticle($database);
                break;
            case "update":
                echo json_encode(failMessage("API type update does not exist"));
                break;
            case "login":
                echo json_encode(failMessage("API type login does not exist"));
                break;
            case "rate":
                echo json_encode(["status"=> "success", "timestamp"=>time(), "data"=>["message"=>"Article rated with value 0"]]);
                break;
            case "chat":
                echo json_encode(failMessage("API type chat does not exist"));
                break;
            default:
                echo json_encode(failMessage("Unexpected error occured"));
          } 

        
        //echo json_encode($_POST["return"]);
    }    

    function failMessage($message){
        return ["status"=> "failed", "timestamp"=>time(), "data"=>["message"=>$message]];
    }

    function getArticle($database, $link = "", $title = "", $author = "", $date = "", $image = "", $tag = "", $description = ""){
        populateDatabase($database);
        //$returnString = ["status"=> "success", "timestamp"=>time(), "data"=>[]];
        //echo json_encode($returnString);
    }

    function populateDatabase($database){
        $query = "SELECT `refreshed` FROM `refreshed` WHERE 1";
        $result = $database->getConnection()->query($query);

        $value = null;
        while($row = $result->fetch_assoc()){          
            $value = $row["refreshed"];
        }

        $refrshedTime = strtotime($value);
        $currentTime = time();

        $refresh = false;
        if($currentTime - $refrshedTime >= 7200){
            $refresh = true;
        }

        if($refresh){
            $url = "https://api.nytimes.com/svc/news/v3/content/all/world.json?limit=40&offset=40&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init( $url);
            curl_setopt($request, CURLOPT_URL, $url);
            curl_setopt($request, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($request);
            curl_close($request);
            $articles = json_decode($response, true);
            

            foreach ($articles["results"] as $article) {
                var_dump($article);
            } 
        }
    }
?>