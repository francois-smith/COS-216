<?php
    include_once(dirname(__FILE__).'/COS216/PA4/php/General/config.php');
    $database = Database::getInstance();
    $API = API::getInstance();
    
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(!isset($data["type"])){
            echo json_encode($API->failMessage("Type parameter not set"));
            return;
        }

        $requestTypes = ["info", "update", "login", "rate", "chat"];
        if(!in_array($data["type"], $requestTypes)){
            echo json_encode($API->failMessage("Type parameter not set"));
            return;
        }

        switch ($data["type"]) {
            case "info":
                if(!isset($data["return"])){
                    echo json_encode($API->failMessage("No return parameters not set"));
                    return;
                }
        
                $returnTypes = ["title", "description", "image", "author", "tag", "date", "rating", "link", "*", "user_name", "user_surname", "user_id", "user_theme", "user_preference", "user_key", "user_email"];
                if(empty(array_intersect($returnTypes, $data["return"]))){
                    echo json_encode($API->failMessage("Invalid return parameter"));
                    return;
                }

                if(!array_key_exists("title", $data)) $title = "";
                else $title = $data["title"];

                if(!array_key_exists("author", $data)) $author = "";
                else $author = $data["author"];

                if(!array_key_exists("date", $data)) $date = "";
                else $date = $data["date"];

                if(!array_key_exists("rating", $data)) $rating = "";
                else $rating = $data["rating"];

                if(!array_key_exists("tag", $data)){
                    $tag = "";
                } 
                else {
                    if($data["tag"] == "none"){
                        $tag = "";
                    }
                    else{
                        $arr = explode(" ", $data["tag"], 2);
                        $tag = $arr[0];
                    }
                }

                if(!array_key_exists("limit", $data)) $limit = 20;
                else $limit = $data["limit"];

                $API->getArticle($database, $title, $author, $date, $rating, $data["return"], $tag, $limit);
                break;
            case "update":
                echo json_encode($API->failMessage("API type update does not exist"));
                break;
            case "login":
                if(!array_key_exists("password", $data)){
                    echo json_encode($API->failMessage("Invalid Login Credentials"));
                    return;
                } 
                else $password = $data["password"];

                if(!array_key_exists("email", $data)){
                    echo json_encode($API->failMessage("Invalid Login Credentials"));
                    return;
                } 
                else $email = $data["email"];

                $returnTypes = ["*"];
                if(empty(array_intersect($returnTypes, $data["return"]))){
                    echo json_encode($API->failMessage("Invalid return parameter"));
                    return;
                }
                
                $API->logIn($email, $password,  $data["return"]);
                break;
            case "rate":
                echo json_encode(["status"=> "success", "timestamp"=>time(), "data"=>["message"=>"Article rated with value 0"]]);
                break;
            case "chat":
                echo json_encode($API->failMessage("API type chat does not exist"));
                break;
            default:
                echo json_encode($API->failMessage("Unexpected error occured"));
        } 
    }    

    class API{
        private static $instance = null;

        public static function getInstance(){
            if(!self::$instance){
                self::$instance = new API();
            }

            return self::$instance;
        }

        function failMessage($message){
            return ["status"=> "failed", "timestamp"=>time(), "data"=>["message"=>$message]];
        }

        function logIn($email, $password){
            include_once(dirname(__FILE__)."/COS216/PA4/php/LoginPage/validate-login.php");
            $return = validateLogin($email, $password);
            if(!$return){
                echo json_encode($this->failMessage("Invalid Login Credentials"));
                return;
            }
            echo json_encode(["status"=> "success", "timestamp"=>time(), "data"=>["message"=>$return]]);
        }
    
        function getArticle($database, $title, $author, $date, $rating, $types, $tag, $limit){
            $database->populateDatabase();
    
            $articles = [];
            if($title != ""){
                $query = "SELECT * FROM `articles` WHERE title LIKE '%$title%' ORDER BY `id` DESC";
                $result = $database->getConnection()->query($query);
    
                $row = null;
                while($row = $result->fetch_assoc()){          
                    $articles[] = $row;
                }
            }
    
            if($author != ""){
                $query = "SELECT * FROM `articles` WHERE author LIKE '% $author %' ORDER BY `id` DESC";
                $result = $database->getConnection()->query($query);
    
                $row = null;
                while($row = $result->fetch_assoc()){          
                    $articles[] = $row;
                }
            }
    
            if($date != ""){
                $query = "SELECT * FROM `articles` WHERE `date` LIKE '%$date%' ORDER BY `id` DESC";
                $result = $database->getConnection()->query($query);
    
                $row = null;
                while($row = $result->fetch_assoc()){          
                    $articles[] = $row;
                }
            }

            if($tag != ""){
                $query = "SELECT * FROM `articles` WHERE `tag` LIKE '$tag%' ORDER BY `id` DESC";
                $result = $database->getConnection()->query($query);
    
                $row = null;
                while($row = $result->fetch_assoc()){          
                    $articles[] = $row;
                }
            }
    
            if($rating != ""){
                $query = "SELECT * FROM `articles` WHERE `rating`='$rating' ORDER BY `id` DESC";
                $result = $database->getConnection()->query($query);
    
                $row = null;
                while($row = $result->fetch_assoc()){          
                    $articles[] = $row;
                }
            }
    
            if($title == "" && $date == "" && $author == "" && $rating == "" && $tag == ""){
                $query = "SELECT * FROM `articles` ORDER BY `id` DESC LIMIT ".$limit;
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
                if($num < $limit){
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
    }
?>