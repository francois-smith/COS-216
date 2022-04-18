<?php 
    if(!isset($_SESSION)){
        session_start();
    }

    if($_SERVER["REQUEST_METHOD"] == "GET") {
        $instance = Database::getInstance();
        $instance->getImages($_GET["section"]);
    }

    class Database{
        private static $instance = null;
        private $connection;

        private $servername = "sql655.your-server.de";
        private $username = "maryna";
        private $password = "Kiekie1966";
        private $db = "photography";

        private function __construct() {
            $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->db);
            if($this->connection->connect_error) {
                die("Connection failed: " . $this->connection->connect_error);
            } 
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
        
        public function retrieveUser($username, $password){ 
            $sql = "SELECT `username`, `password` FROM `user` WHERE 1";
            $result = $this->connection->query($sql);
            $result = $result->fetch_assoc();
            if(password_verify($password, $result["password"]) && $result["username"] == $username){
                $_SESSION["LOGGED_IN"] = true; 
                header('Location: dashboard.php');
            }  
            else{
                echo'
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <title>M Photography | Login</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                        </head>
                        <body>
                            <div id="login-container">
                                <div id="form-container">
                                    <h2>LOGIN</h2>
                                    <form action="/admin/login.php" method="post" id="login-form">
                                        <input type="text" name="name" placeholder="Username" required/>
                                        <input type="password" name="password" placeholder="Password" required/>
                                        <input type="submit" value="CONTINUE"/>
                                        <span id="error-message">Credentials are Incorrect</span>
                                    </form>
                                </div>
                            </div>
                        </body>
                        <style>
                            @import url("https://fonts.googleapis.com/css2?family=Oswald");
                    
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            html {
                                overflow-x: hidden;
                            }
                    
                            body {
                                height: 100vh;
                                font-size: 20px;
                                font-family: "Oswald", sans-serif;
                                display: grid;
                                background-color: #eee;
                            }
                    
                            #login-container{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                    
                            #form-container{
                                display: flex;
                                flex-direction: column;
                                padding: 30px;
                                background-color: #fff;
                            }
                    
                            #login-form{
                                display: flex;
                                flex-direction: column;
                            }
                    
                            h2{
                                font-weight: 400;
                                color: #666;
                                font-size: 25px;
                                width: 100%;
                            }
                    
                            input{
                                margin-top: 10px;
                                padding: 10px;
                                border: 1.5px solid #999;
                                border-radius: 2px;
                            }
                    
                            input[type="text"]{
                                width: 350px;
                                font-size: 15px;
                            }
                    
                            input[type="submit"]{
                                font-family: "Oswald", sans-serif;
                                width: 100%;
                                background: linear-gradient(to right, #da8cff, #9a55ff);
                                border: none;
                                color: #fff;
                                font-size: 18px;
                                font-weight: 300;
                            }
                            input[type="submit"]:hover{
                                filter: brightness(0.8);
                            }
                    
                            input:focus {
                                outline: solid 0.15em #9a55ff;
                            }

                            #error-message{
                                color: red;
                                font-size: 18px;
                            }
                        </style>
                        <script>
                        
                        </script>
                    </html>
                ';
            }
        }

        public function addUser($name, $password){
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO user (`username`, `password`) VALUES ('".$name."', '".$hashed_password."')";
            $this->connection->query($sql);
        }

        public function addPhoto($name, $target, $section, $description, $size, $date){
            $sql = "INSERT INTO `images`(`name`, `src`, `section`, `description`, `size`, `uploaded`) VALUES ('$name','$target','$section','$description', '$size','$date')";
            $this->connection->query($sql);
        }

        public function getImages($section){
            $images = [];
            $query = "SELECT * FROM `images` WHERE section LIKE '$section%'";
            $result = $this->getConnection()->query($query);
            while($row = $result->fetch_assoc()){          
                $images[] = $row;
            }
            $returnString = ["data"=>$images];
            echo json_encode($returnString);
        }
    }
?>