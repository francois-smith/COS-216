<?php
    if(!isset($_SESSION)){
        session_start();
    }

    function validateLogin($email, $password){
        include_once($_SERVER['DOCUMENT_ROOT']."/u21649988/COS216/PA4/php/General/config.php");
        $instance = Database::getInstance();
        $user = $instance->retrieveUser($email);

        if($user == null || $user == ""){
            return false;
            $fail = true;
        }
        else{
            $salt = $instance->getUserSalt($user["id"]);
            if($salt == ""){
                return false;
            }
            else{
                $algo = '6';
                $rounds = '500000';
                $cryptSalt = '$'.$algo.'$rounds='.$rounds.'$'.$salt;
                $hashedPassword = crypt($password, $cryptSalt);
                if(crypt($password, $hashedPassword) == $user["password"]){
                    $_SESSION["logged_in"] = true;
                    $_SESSION["user_name"] = $user["name"];
                    $_SESSION["user_id"] = $user["id"];
                    $_SESSION["api_key"] = $user["api_key"];
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
?>