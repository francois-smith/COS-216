<?php
    session_start();

    class Database{
        private static $instance = null;
        private $connection;

        private $servername = "localhost";
        private $username = "Francois";
        private $password = "Faffa0319!";
        private $db = "users";

        private function __construct() {
            $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->db);
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
                    $this->failMessage("Email already registered");
                }
            }
        }

        private function failMessage($message){

        }

        private function successMessage($message, $name){
            require_once("../General/header.php");
            echo '
                <head>
                    <link rel="stylesheet" href="/COS216/PA3/CSS/signup.css">
                </head>
                <main>
                    <div class="form-container">
                        <div class="successContainer">
                            <h2>Welcome '.$name.'</h2>
                            <p>Thank your for registering an account with us, you can find you API Key below</p>
                            <p>'.$message.'</p>
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
    }
?>