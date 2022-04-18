<?php 
    if(!isset($_SESSION)){
        session_start();
    }
    if(!isset($_SESSION["LOGGED_IN"])){
        $_SESSION["LOGGED_IN"] = false; 
    }
?>

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
                </form>
            </div>
        </div>
    </body>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Oswald');

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
            font-family: 'Oswald', sans-serif;
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
            font-family: 'Oswald', sans-serif;
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
    </style>
    <script>
    
    </script>
</html>
