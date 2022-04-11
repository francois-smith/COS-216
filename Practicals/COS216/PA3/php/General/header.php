<?php 
    require_once("config.php");
    echo '
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <link rel="icon" href="/Practicals/IMG/Favicon.ico" type="image/x-icon">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>NewsLodge | Daily News</title>
                <meta name="description" content="News website birning you the latest updates of things happening around the world">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/Practicals/CSS/MainStyle.css">
            </head>
            <body>
                <nav>
                    <div id="top-bar-container">
                        <div id="top-bar" class="center">
                            <div id="date-time" class="center">                    
                                <img alt="image of clock" src="img/Time.png">
                                <span>weekday, day month year</span>
                            </div>
                            <div id="user">
                                <img src="/Practicals/PA3/img/SVG/user_icon.svg" alt="user icon">
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
                            <img src="/Practicals/IMG/Logo.png" alt="logo">
                            <p><span>NEWS</span><span class="orange-text">LODGE</span></p>
                        </div>
                    <div class="center" id="links">
                        <div id="link-container">
                            <a href="/Practicals/PA3/today.html"><span>Today</span></a>
                            <a href="/Practicals/PA3south-africa.html"><span>South Africa</span></a>
                            <a href="/Practicals/PA3world.html"><span>World</span></a>
                            <a href="/Practicals/PA3covid.html"><span>COVID-19</span></a>
                            <a href="/Practicals/PA3calendar.html"><span>Calendar</span></a>
                        </div>
                    </div>
                </nav>
                <script src="JS/general.js"></script>
            </body>
        </html>
    ';
?>