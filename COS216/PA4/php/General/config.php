<?php
    if(!isset($_SESSION)){
        session_start();
        if(!isset($_SESSION["api_key"])){
            $_SESSION["api_key"] = "47dee55dbeb7ce9cfff65c1e854d05443a3f432797603f96";
        }
        if(!isset($_SESSION["logged_in"])){
            $_SESSION["logged_in"] = false;
        }
        if(!isset($_SESSION["user_id"])){
            $_SESSION["user_id"] = "";
        }
        if(!isset($_SESSION["user_name"])){
            $_SESSION["user_name"] = "";
        }
        if(!isset($_SESSION["user_surname"])){
            $_SESSION["user_surname"] = "";
        }
        if(!isset($_SESSION["preference"])){
            $_SESSION["preference"] = "none";
        }
        if(!isset($_SESSION["theme"])){
            $_SESSION["theme"] = "light";
        }
        if(!isset($_SESSION["email"])){
            $_SESSION["email"] = "";
        }
    }

    class Database{
        private static $instance = null;
        private $connection;

        private $servername = "wheatley.cs.up.ac.za";
        private $username = "u21649988";
        private $password = "EGWH7BHBJST7SC6QIHD7RDPXEB2C5DX2";
        private $db = "u21649988";

        private function __construct() {
            $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->db);
            if($this->connection->connect_error) {
                die("Connection failed: " . $this->connection->connect_error);
            } 
            $this->populateDatabase();
        }

        public static function getInstance(){
            if(!self::$instance){
                self::$instance = new Database();
            }

            return self::$instance;
        }

        public function __destruct() { 
            $this->connection->close();
        }

        public function getConnection(){
            return $this->connection;
        }
        
        public function updateUser($email, $key, $updatedInfo){ 
            $user = $this->retrieveUser($email);
            if($user != "" || $user != null){
                if($user["email"] == $email && $user["api_key"] == $key){
                    if(array_key_exists("newName", $updatedInfo) && array_key_exists("newSurname", $updatedInfo) && array_key_exists("newTheme", $updatedInfo) && array_key_exists("newPreference", $updatedInfo)){
                        $query = "UPDATE `users` SET `name`='".$updatedInfo['newName']."', `surname`='".$updatedInfo['newSurname']."', `theme`='".$updatedInfo['newTheme']."', `preference`='".$updatedInfo['newPreference']."' WHERE `id` = ".$user["id"];
                        $result = $this->connection->query($query);
                        $user = $this->retrieveUser($email);
                        return $user;
                    }
                    else{
                        return "Details could not be updated";
                    }
                }
                else{
                    return "Details could not be updated";
                }
            }
            else{
                return "Details could not be updated";
            }
        }

        public function retrieveUser($email){ 
            $query = "SELECT * FROM  `users` WHERE `email` = '$email'";
            $result = $this->connection->query($query);
    
            if($result){
                if($result->num_rows == 0) {
                    return "";
                }
                else{
                    return $result->fetch_assoc();
                }
            }
            else{
                return "";
            }
        }

        public function getUserSalt($id){
            $return = "";
            $query = "SELECT * FROM  `usersalts` WHERE `id` = '$id'";
            $result = $this->connection->query($query);
            if($result){
                $return = $result->fetch_assoc()["salt"];
            }
            return $return;
        }

        public function addUser($name, $surname, $email, $passwordHashed, $salt, $password){
            $stmt = $this->connection->prepare("SELECT * FROM  `users` WHERE `email` = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
            if($stmt) {
                if($stmt->num_rows == 0) {
                    $api_key = bin2hex(random_bytes(24));
                    $theme = "light";
                    $preference = "none";

                    $stmt = $this->connection->prepare("INSERT INTO users (`name`, `surname`, `email`, `password`, `theme`, `preference`, `api_key`) VALUES (?, ?, ?, ?, ?, ?, ?)");
                    $stmt->bind_param("sssssss", $name, $surname, $email, $passwordHashed, $theme, $preference, $api_key);
                    $stmt->execute();
                    $stmt->store_result();

                    $insert_id = $stmt->insert_id; 
                    $stmt2 = $this->connection->prepare("INSERT INTO usersalts (`id`, `salt`) VALUES (?, ?)");
                    $stmt2->bind_param("is", $insert_id, $salt);
                    $stmt2->execute();
                    
                    $_SESSION["logged_in"] = true;
                    $_SESSION["user_name"] = $name;
                    $_SESSION["user_surname"] = $surname;
                    $_SESSION["user_id"] = $insert_id;
                    $_SESSION["api_key"] = $api_key;
                    $_SESSION["preference"] = $preference;
                    $_SESSION["theme"] = $theme;
                    $_SESSION["email"] = $email;
                } else {
                    $this->failMessage($email);
                }
            }
        }

        public function addNews($title, $description, $author, $image, $tag, $articleDate, $link, $rating){
            $stmt = $this->connection->prepare("INSERT INTO articles (`title`, `description`, `author`, `image`, `tag`, `date`, `link`, `rating`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssss", $title, $description, $author, $image, $tag, $articleDate, $link, $rating);
            $stmt->execute();
        }

        private function failMessage($email){
            require_once("../General/header.php");
            echo '
                <main>
                    <div class="form-container">
                        <div class="responseContainer">
                            <h2 class="blue-text">An Error Occured</h2>
                            <p>The following email is already registered: </p>
                            <span id="responseContainerMessage">'.$email.'</span>
                            <p>Please <span onclick="loginPage()" id="login-link">log in</span> using this email</p>
                        </div>
                        <div class="quote-contianer">
                            <p><span class="blue-text">Spreading </span><span>Knowledge</span></p>
                        </div>
                    </div>
                </main>
                <script src="/u21649988/COS216/PA4/JS/signup.js"></script>
            ';
            require_once("../General/footer.php");
        }

        public function populateDatabase(){
            $query = "SELECT `refreshed` FROM `refreshed` WHERE 1";
            $result = $this->connection->query($query);
    
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
                $sql = "SELECT * FROM articles";
                $result = $this->connection->query($sql);
                $count = mysqli_num_rows($result);

                if($count >= 1000){
                    $sql = "DELETE FROM articles LIMIT 50";
                    $result = $this->connection->query($sql);
                }

                $url = "https://api.nytimes.com/svc/news/v3/content/all/world.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $worldArticles = json_decode($response, true);
    
                $url = "https://api.nytimes.com/svc/news/v3/content/all/business.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $businessArticles = json_decode($response, true);
    
                $url = "https://api.nytimes.com/svc/news/v3/content/all/health.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $healthArticles = json_decode($response, true);
    
                $url = "https://api.nytimes.com/svc/news/v3/content/all/sports.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $sportsArticles = json_decode($response, true);

                $url = "https://api.nytimes.com/svc/news/v3/content/all/technology.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $technologyArticles = json_decode($response, true);
    
                $articles = array();
                foreach($worldArticles["results"] as $article){
                    $articles[] = $article;
                }
                foreach($businessArticles["results"] as $article){
                    $articles[] = $article;
                }
                foreach($healthArticles["results"] as $article){
                    $articles[] = $article;
                }
                foreach($sportsArticles["results"] as $article){
                    $articles[] = $article;
                }
                foreach($technologyArticles["results"] as $article){
                    $articles[] = $article;
                }
    
                curl_close($request);

                foreach ($articles as $article) {
                    if($article != null){
                        if($article["multimedia"] != null){
                            $description = addslashes($article["multimedia"][3]["caption"]);
                            $imageURL = $article["multimedia"][3]["url"];
                            $imageURL = str_replace("-articleInline", "-superJumbo", $imageURL);
                            $image = addslashes($imageURL);
                        }
                        else{
                            continue;
                        }
                        $title = addslashes($article["title"]);
                        $author = addslashes($article["byline"]);
                        $tag = addslashes($article["section"]);
                        $date = addslashes($article["created_date"]);
                        $link = addslashes($article["url"]);
                        $rating = 0;
    
                        if($image != null){
                            $this->addNews($title, $description, $author, $image, $tag, $date, $link, $rating);
                        }
                    }
                } 

                $url = "https://newsapi.org/v2/top-headlines?country=za&apiKey=6177734ee24447ca80a86b6c2a83a3af";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $southAfricaArticles = json_decode($response, true);

                $articles = array();
                foreach($southAfricaArticles["articles"] as $article){
                    $articles[] = $article;
                }

                array_unique($articles, SORT_REGULAR);

                foreach($articles as $article){
                    if($article != null){
                        if($article["source"]["name"] == "Google News" || $article["source"]["name"] == "Businesstech.co.za" || $article["source"]["name"] == "News-Medical.Net"){
                            continue;
                        }
                        else{
                            $title = addslashes($article["title"]);
                            $author = addslashes($article["author"]);
                            $tag = "South Africa";
                            $date = addslashes($article["publishedAt"]);
                            $link = addslashes($article["url"]);
                            $description = addslashes($article["content"]);
                            $image = addslashes($article["urlToImage"]);
                            $rating = 0;

                            $this->addNews($title, $description, $author, $image, $tag, $date, $link, $rating);
                        }
                    }
                }

                curl_close($request);

                $sql = "UPDATE `refreshed` SET `refreshed`=CURRENT_TIMESTAMP";
                $this->connection->query($sql);
            }
        }
    }
?>