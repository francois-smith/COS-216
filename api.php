<?php

use function PHPSTORM_META\type;

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
        if($currentTime - $refrshedTime >= 7200*3){
            $refresh = true;
        }

        if($refresh){
            $worldURL = "https://api.nytimes.com/svc/news/v3/content/all/world.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $worldRequest = curl_init($worldURL);
            curl_setopt($worldRequest, CURLOPT_URL, $worldURL);
            curl_setopt($worldRequest, CURLOPT_RETURNTRANSFER, true);
            $worldResponse = curl_exec($worldRequest);
            $worldArticles = json_decode($worldResponse, true);
            curl_close($worldRequest);
            

            $businessURL = "https://api.nytimes.com/svc/news/v3/content/all/business.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $businessRequest = curl_init($businessURL);
            curl_setopt($businessRequest, CURLOPT_URL, $businessURL);
            curl_setopt($businessRequest, CURLOPT_RETURNTRANSFER, true);
            $businessResponse = curl_exec($businessRequest);
            $businessArticles = json_decode($businessResponse, true);

            $articles = array();
            foreach($worldArticles["results"] as $article){
                $articles[] = $article;
            }
            foreach($businessArticles["results"] as $article){
                $articles[] = $article;
            }

            //var_dump($articles["results"]);
            /*

            $url = "https://api.nytimes.com/svc/news/v3/content/all/health.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init($url);
            $response = curl_exec($request);
            $health = json_decode($response, true);

            $url = "https://api.nytimes.com/svc/news/v3/content/all/movies.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init($url);
            $response = curl_exec($request);
            $movies = json_decode($response, true);

            $url = "https://api.nytimes.com/svc/news/v3/content/all/science.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init($url);
            $response = curl_exec($request);
            $science = json_decode($response, true);

            $url = "https://api.nytimes.com/svc/news/v3/content/all/sports.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init($url);
            $response = curl_exec($request);
            $sports = json_decode($response, true);

            $url = "https://api.nytimes.com/svc/news/v3/content/all/technology.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init($url);
            $response = curl_exec($request);
            $technology = json_decode($response, true);

            $url = "https://api.nytimes.com/svc/news/v3/content/all/travel.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
            $request = curl_init($url);
            $response = curl_exec($request);
            $travel = json_decode($response, true);

            $articles = array();
            foreach($worldArticles["results"] as $article){
                $articles[] = $article;
            }
            foreach($businessArticles["results"] as $article){
                $articles[] = $article;
            }

            var_dump($articles);

            foreach ($articles as $article) {
                
            } 
            */
        }
    }
?>