<?php 
    class Database{
        public static function instance(){
            static $instance = null;
            if($instance === null) $instance = new Database();
            return $instance;
        }

        private function __construct() {
            /*Connect to the database*/ 
        }

        public function __destruct() { 
            /*Disconnect from the database*/ 
        }
        
        public function retrieveUser($username){ 
            /*Retrieve from the database*/ 
        }
    }
    $user = Database::instance()->retrieveUser("satoshi");
?>