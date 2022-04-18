<?php 
    require_once("config.php");
    $instance = Database::getInstance();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <link rel="icon" href="/u21649988/IMG/Favicon.ico" type="image/x-icon">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>NewsLodge | Daily News</title>
        <meta name="description" content="News website birning you the latest updates of things happening around the world">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/u21649988/CSS/MainStyle.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.js"></script>
    </head>
    <body>
        <nav>
            <div id="top-bar-container">
                <div id="top-bar" class="center">
                    <div id="date-time" class="center">                    
                        <img alt="image of clock" src="/u21649988/COS216/PA4/img/Time.png">
                        <span>weekday, day month year</span>
                    </div>
                    <div id="user">
                        <img src="/u21649988/COS216/PA4/img/SVG/user_icon.svg" alt="user icon">
                        <span id="username">My Account</span>
                        <div id="loginContainer">
                            <span>Welcome to NewsLodge</span>
                            <div id="divider"></div>
                            <div id="buttons-container">
                                <span onclick="loginPage()" id="login">Login</span>
                                <span onclick="registerPage()" id="register">Register</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center" id="title-logo">
                <img src="/u21649988/IMG/Logo.png" alt="logo">
                <p><span>NEWS</span><span class="orange-text">LODGE</span></p>
            </div>
            <div class="center" id="links">
                <div id="link-container">
                    <a href="/u21649988/COS216/PA4/today.php"><span>Today</span></a>
                    <a href="/u21649988/COS216/PA4/south-africa.php"><span>South Africa</span></a>
                    <a href="/u21649988/COS216/PA4/world.php"><span>World</span></a>
                    <a href="/u21649988/COS216/PA4/covid.php"><span>COVID-19</span></a>
                    <a href="/u21649988/COS216/PA4/calendar.php"><span>Calendar</span></a>
                </div>
            </div>
        </nav>
        
    </body>
</html>