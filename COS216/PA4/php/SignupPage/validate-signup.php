<?php
    $name = $surname = $email = $password = $confirmPass = $salt =  "";
    $validated = true;

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = testName($_POST["name"]);
        $surname = testSurname($_POST["surname"]);
        $email = testEmail($_POST["email"]);
        $confirmPass = testConfirm($_POST["confirmPassword"], $_POST["password"]);
        $salt = generateSalt();
        $password = testPassword($_POST["password"], $salt);

        if($validated){
            include '../General/config.php';
            $instance = Database::getInstance();
            $instance->addUser($name, $surname, $email, $password, $salt);
        }
    }

    function testName($data) {
        if(ctype_alpha($data) && strlen($data) > 2){
            return $data;
        }
        else{
            failValidate("Name failed to validate");
            $validated = false;
        }
    }

    function testSurname($data) {
        if(ctype_alpha($data) && strlen($data) > 2){
            return $data;
        }
        else{
            failValidate("Surname failed to validate");
            $validated = false;
        }
    }

    function testEmail($data){
        if(filter_var($data, FILTER_VALIDATE_EMAIL)){
            return $data;
        }
        else{
            failValidate("Email failed to validate");
            $validated = false;
        }
    }

    function testPassword($data, $salt){
        $uppercase = preg_match('@[A-Z]@', $data);
        $lowercase = preg_match('@[a-z]@', $data);
        $number = preg_match('@[0-9]@', $data);
        $specialChars = preg_match('@[^\w]@', $data);

        if(!$uppercase || !$lowercase || !$number || !$specialChars || strlen($data) < 8) {
            failValidate("Password failed to validate");
            $validated = false;
        }
        else{
            $algo = '6';
            $rounds = '500000';
            $cryptSalt = '$'.$algo.'$rounds='.$rounds.'$'.$salt;
            $hashedPassword = crypt($data, $cryptSalt);
            //echo(crypt($data, $hashedPassword) == $hashedPassword);
            return $hashedPassword;
        }
    }

    function generateSalt(){
        return uniqid('', true);
    }

    function testConfirm($data, $password){
        if($data === $password) {
            return $data;
        }
        else{ 
            failValidate("Password failed to validate");
            $validated = false;  
        }
    }

    function failValidate($message){
        require_once("../General/header.php");
        echo '
            <main>
                <div class="form-container">
                    <div class="responseContainer">
                        <h2>An Unexpected Error Occured</h2>
                        <p>'.$message.'</p>
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
?>