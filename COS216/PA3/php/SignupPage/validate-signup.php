<?php
    $name = $surname = $email = $password = $confirmPass = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = testName($_POST["name"]);
        //$email = test_input($_POST["email"]);
        //$website = test_input($_POST["website"]);
        //$comment = test_input($_POST["comment"]);
        //$gender = test_input($_POST["gender"]);
    }

    function testName($data) {
        if(ctype_alpha($data)){

        }
        else{
            return $data;
        }
    }
?>