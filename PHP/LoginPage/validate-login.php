<?php
ini_set('display_errors', '1');

    if(!isset($_SESSION)){
        session_start();
    }

    function validateLogin($email, $password, $instance){
        $user = $instance->retrieveUser($email);

        if($user == null || $user == ""){
            return false;
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
                    $_SESSION["user_surname"] = $user["surname"];
                    $_SESSION["user_id"] = $user["id"];
                    $_SESSION["api_key"] = $user["api_key"];
                    $_SESSION["preference"] = $user["preference"];
                    $_SESSION["theme"] = $user["theme"];
                    $_SESSION["email"] = $user["email"];
                    
                    $returnData = $user;
                    unset($returnData["password"]);
                    return $returnData;
                }
                else{
                    return false;
                }
            }
        }
    }
?>