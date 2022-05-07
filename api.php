<?php
    ini_set('display_errors', '1');
    include_once('./COS216/PA4/php/General/config.php');
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
                if(!isset($data["key"])){
                    echo json_encode($API->failMessage("API key not set"));
                    return;
                }
                
                if(!isset($data["return"])){
                    echo json_encode($API->failMessage("No return parameters not set"));
                    return;
                }
        
                $returnTypes = ["title", "description", "image", "author", "tag", "date", "rating", "link", "*"];
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
                if(!array_key_exists("key", $data)){
                    echo json_encode($API->failMessage("API key not set"));
                    return;
                }

                if(!array_key_exists("updatedInfo", $data)){
                    echo json_encode($API->failMessage("Invalid new information"));
                    return;
                }

                if(!array_key_exists("email", $data)){
                    echo json_encode($API->failMessage("No email provided"));
                    return;
                }

                if(strlen($data["key"]) != 48){
                    echo json_encode($API->failMessage("Invalid key provided"));
                    return;
                }

                if($data["key"] == "47dee55dbeb7ce9cfff65c1e854d05443a3f432797603f96"){
                    echo json_encode($API->failMessage("Please log in to use this functionality"));
                    return;
                }

                $result = $database->updateUser($data["email"], $data["key"], $data["updatedInfo"]);
                if($result == "Details could not be updated"){
                    echo json_encode($API->failMessage("Details could not be updated"));
                }
                else{
                    $_SESSION["user_name"] = $result["name"];
                    $_SESSION["user_surname"] = $result["surname"];
                    $_SESSION["api_key"] = $result["api_key"];
                    $_SESSION["preference"] = $result["preference"];
                    $_SESSION["theme"] = $result["theme"];
                    $_SESSION["email"] = $result["email"];
                    echo json_encode(["status"=> "success", "timestamp"=>time(), "data"=>["message"=>"Details updated successfully"]]);
                }
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
                
                $API->logIn($email, $password, $database);
                break;
            case "rate":
                if(!array_key_exists("key", $data)){
                    echo json_encode($API->failMessage("API key not set"));
                    return;
                }

                if(strlen($data["key"]) != 48){
                    echo json_encode($API->failMessage("Invalid key provided"));
                    return;
                }

                if($data["key"] == "47dee55dbeb7ce9cfff65c1e854d05443a3f432797603f96"){
                    echo json_encode($API->failMessage("Please log in to use this functionality"));
                    return;
                }

                if(!array_key_exists("rating", $data) || $data["rating"] > 5 || $data["rating"] < 0){
                    echo json_encode($API->failMessage("Rating Invalid"));
                    return;
                }

                if(!array_key_exists("article_id", $data)){
                    echo json_encode($API->failMessage("Article not set"));
                    return;
                }

                if(!array_key_exists("user_id", $data)){
                    echo json_encode($API->failMessage("Invalid user ID provided"));
                    return;
                }

                rate($data["user_id"], $data["article_id"], $data["rating"], $database);
                break;
            case "chat":
                if(!array_key_exists("key", $data)){
                    echo json_encode($API->failMessage("API key not set"));
                    return;
                }

                if(strlen($data["key"]) != 48){
                    echo json_encode($API->failMessage("Invalid key provided"));
                    return;
                }

                if($data["key"] == "47dee55dbeb7ce9cfff65c1e854d05443a3f432797603f96"){
                    echo json_encode($API->failMessage("Please log in to use this functionality"));
                    return;
                }

                
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

        function logIn($email, $password, $database){
            include_once("./COS216/PA4/php/LoginPage/validate-login.php");
            $return = validateLogin($email, $password, $database);
            if(!$return){
                echo json_encode($this->failMessage("Invalid Login Credentials"));
                return;
            }
            echo json_encode(["status"=> "success", "timestamp"=>time(), "data"=>["message"=>$return]]);
        }

        function rate($user_id, $article_id, $rating, $database){
            $query = "SELECT rating FROM ratings WHERE article_id = ".$data["article_id"]." AND user_id = '".$data["user_id"]."'"; 
            $result = $database->getConnection()->query($query); 
            
            if($result->num_rows > 0){ 
                $status = "failed";
                $message = "You Have Already Rated This Article"; 
            }else{ 
                $query = "INSERT INTO ratings (`article_id`, `user_id`, `rating`) VALUES ('".$data["article_id"]."', '".$data["user_id"]."', '".$data["rating"]."')"; 
                $insert = $database->getConnection()->query($query); 
                
                $status = "success";
                $message = "Article Successfully Rated"; 
            } 

            $query = "SELECT COUNT(rating) as numRatings, FORMAT((SUM(rating) / COUNT(rating)),1) as avgRating FROM ratings WHERE article_id = ".$data["article_id"]." GROUP BY (article_id)"; 
            $result = $database->getConnection()->query($query); 
            $ratingData = $result->fetch_assoc(); 

            echo json_encode(["status"=> $status, "timestamp"=>time(), "data"=>["message"=>$message, "rating"=>$ratingData]]);
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
                            $query = "SELECT a.id, COUNT(r.rating) as numRatings, FORMAT((SUM(r.rating) / COUNT(r.rating)),1) as avgRating FROM articles as a LEFT JOIN ratings as r ON r.article_id = a.id WHERE a.id = ".$article["id"]." GROUP BY (r.article_id)"; 
                            $result = $database->getConnection()->query($query); 
                            $ratings = $result->fetch_assoc(); 
                            $element["rating"] = $ratings;
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