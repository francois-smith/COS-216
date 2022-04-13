<?php

    class Database{
        private static $instance = null;
        private $connection;

        private $servername = "localhost";
        private $username = "Francois";
        private $password = "Faffa0319!";
        private $db = "users";

        private function __construct() {
            session_start();
            $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->db);
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
            $result = $this->connection->query("SELECT * FROM users WHERE email = '$email'");
            if ($result) {
                if($result->num_rows == 0) {
                    $api_key = bin2hex(random_bytes(24));
                    $sql = "INSERT INTO users (name, surname, email, password, api_key) VALUES ('".$name."', '".$surname."', '".$email."', '".$password."', '".$api_key."')";
                    $this->connection->query($sql);
                    $sql = "INSERT INTO usersalts (id, salt) VALUES ('".$this->connection->insert_id."', '".$salt."')";
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
                <script src="/COS216/PA3/JS/signup.js"></script>
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
                <script src="/COS216/PA3/JS/signup.js"></script>
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
    
                $url = "https://api.nytimes.com/svc/news/v3/content/all/movies.json?limit=10&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP";
                $request = curl_init($url);
                curl_setopt($request, CURLOPT_URL, $url);
                curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($request);
                $moviesArticles = json_decode($response, true);
    
  
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
                foreach($moviesArticles["results"] as $article){
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
                            $description = addslashes($article["multimedia"][0]["caption"]);
                            $image = addslashes($article["multimedia"][0]["url"]);
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
                $sql = "UPDATE `refreshed` SET `refreshed`=CURRENT_TIMESTAMP";
                $this->connection->query($sql);
            }
        }
    }
?>