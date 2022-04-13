<?php
    include_once('COS216/PA3/php/General/config.php');
    $database = Database::getInstance();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(!isset($_POST["key"])){
            echo json_encode(failMessage("Key parameter not set"));
            return;
        }

        if(strlen($_POST["key"]) != 48){
            echo json_encode(failMessage("Key parameter is invalid"));
            return;
        }


        if(!isset($_POST["type"])){
            echo json_encode(failMessage("Type parameter not set"));
            return;
        }

        $requestTypes = ["info", "update", "login", "rate", "chat"];
        if(!in_array($_POST["type"], $requestTypes)){
            echo json_encode(failMessage("Type parameter not set"));
            return;
        }

        if(!isset($_POST["return"])){
            echo json_encode(failMessage("No return parameters not set"));
            return;
        }

        $returnTypes = ["title", "description", "image", "author", "tag", "date", "rating", "link", "*"];
        if(empty(array_intersect($returnTypes, $_POST["return"]))){
            echo json_encode(failMessage("Invalid return parameter"));
            return;
        }

        switch ($_POST["type"]) {
            case "info":
                if(!array_key_exists("title", $_POST)) $title = "";
                else $title = $_POST["title"];

                if(!array_key_exists("author", $_POST)) $author = "";
                else $author = $_POST["author"];

                if(!array_key_exists("date", $_POST)) $date = "";
                else $date = $_POST["date"];

                if(!array_key_exists("rating", $_POST)) $rating = "";
                else $rating = $_POST["rating"];

                getArticle($database, $title, $author, $date, $rating, $_POST["return"]);
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
    }    

    function failMessage($message){
        return ["status"=> "failed", "timestamp"=>time(), "data"=>["message"=>$message]];
    }

    function getArticle($database, $title, $author, $date, $rating, $types){
        $database->populateDatabase();

        $articles = [];
        if($title != ""){
            $query = "SELECT * FROM `articles` WHERE title LIKE '%$title%'";
            $result = $database->getConnection()->query($query);

            $row = null;
            while($row = $result->fetch_assoc()){          
                $articles[] = $row;
            }
        }

        if($author != ""){
            $query = "SELECT * FROM `articles` WHERE author LIKE '%$author%'";
            $result = $database->getConnection()->query($query);

            $row = null;
            while($row = $result->fetch_assoc()){          
                $articles[] = $row;
            }
        }

        if($date != ""){
            $query = "SELECT * FROM `articles` WHERE `date` LIKE '%$date%'";
            $result = $database->getConnection()->query($query);

            $row = null;
            while($row = $result->fetch_assoc()){          
                $articles[] = $row;
            }
        }

        if($rating != ""){
            $query = "SELECT * FROM `articles` WHERE `rating`='.$rating.'";
            $result = $database->getConnection()->query($query);

            $row = null;
            while($row = $result->fetch_assoc()){          
                $articles[] = $row;
            }
        }

        if($title == "" && $date == "" && $author == "" && $rating == ""){
            $query = "SELECT * FROM `articles` LIMIT 20";
            $result = $database->getConnection()->query($query);

            $row = null;
            while($row = $result->fetch_assoc()){          
                $articles[] = $row;
            }
        }

        $correctTypes = ["title", "description", "image", "author", "tag", "date", "rating", "link", "*"];
        $types = array_intersect($types, $correctTypes);

        $data = [];
        if(empty($articles)){
            $returnString = ["status"=> "success", "timestamp"=>time(), "data"=>["data"=> "No articles found matching request criteria"]];
            echo json_encode($returnString);
            return;
        }

        $element = null;
        $num = 0;
        foreach($articles as $article){
            if($num < 20){
                foreach($types as $type){
                    if($type == "*"){
                        $element = $article;
                        unset($element["id"]);
                        break;
                    }
                    $element[$type] = $article[$type];
                }
                $data[] = $element;
                $num++;
            }
            else{
                break;
            }
        }
        
        $returnString = ["status"=> "success", "timestamp"=>time(), "data"=>$data];
        echo json_encode($returnString);
    }
?>