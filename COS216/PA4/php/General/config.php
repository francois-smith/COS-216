<?php
    class Database{
        private static $instance = null;
        private $connection;

        private $servername = "wheatley.cs.up.ac.za";
        private $username = "u21649988";
        private $password = "EGWH7BHBJST7SC6QIHD7RDPXEB2C5DX2";
        private $db = "u21649988";

        private function __construct() {
            session_start();
            
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
            session_destroy();
        }

        public function getConnection(){
            return $this->connection;
        }
        
        public function retrieveUser($username){ 
            
        }

        public function addUser($name, $surname, $email, $password, $salt){
            $result = $this->connection->query("SELECT * FROM `users` WHERE `email` = '$email'");
            if($result) {
                if($result->num_rows == 0) {
                    $api_key = bin2hex(random_bytes(24));
                    $sql = "INSERT INTO users (`name`, `surname`, `email`, `password`, `theme`, `preference`, `api_key`) VALUES ('".$name."', '".$surname."', '".$email."', '".$password."', 'light', 'none', '".$api_key."')";
                    $this->connection->query($sql);
                    $sql = "INSERT INTO usersalts (`id`, `salt`) VALUES ('".$this->connection->insert_id."', '".$salt."')";
                    $this->connection->query($sql);
                    $this->successMessage($api_key, $name);
                } else {
                    $this->failMessage($email);
                }
            }
        }

        public function addNews($title, $description, $author, $image, $tag, $articleDate, $link, $rating){
            $sql1 = "INSERT INTO articles (title, description, author, image, tag, date, link, rating)";
            $sql2 = " VALUES ('".$title."', '".$description."', '".$author."', '".$image."', '".$tag."', '".$articleDate."', '".$link."', '".$rating."')";
            $this->connection->query($sql1.$sql2);
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
                            <p>Please <span onclick="loginPage()" id="log-in">log in</span> using this email</p>
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

        private function successMessage($message, $name){
            require_once("../General/header.php");
            echo '
                <main>
                    <div class="form-container">
                        <div class="responseContainer">
                            <h2><span class="blue-text">Welcome</span> '.$name.'</h2>
                            <p>Thank your for registering an account with us, you can find you API Key below</p>
                            <span id="responseContainerMessage">'.$message.'</span>
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