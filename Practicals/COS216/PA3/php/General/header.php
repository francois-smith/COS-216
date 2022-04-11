<?php 
    require_once("config.php");
    echo '
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <link rel="icon" href="../../IMG/Favicon.ico" type="image/x-icon">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>NewsLodge | Daily News</title>
                <meta name="description" content="News website birning you the latest updates of things happening around the world">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="../../CSS/MainStyle.css">
            </head>
            <body>
                <nav>
                    <div id="top-bar-container">
                        <div id="top-bar" class="center">
                            <div id="date-time" class="center">                    
                                <img alt="image of clock" src="img/Time.png">
                                <span>weekday, day month year</span>
                            </div>
                            <div id="socials">
                                <a href="https://www.facebook.com/"><img src="../../IMG/svg/icons8-facebook.svg" alt="Facebook Icon"></a>
                                <a href="https://www.instagram.com/"><img src="../../IMG/svg/icons8-instagram.svg" alt="Instagram Icon"></a>
                                <a href="https://twitter.com"><img src="../../IMG/svg/icons8-twitter.svg" alt="Twitter Icon"></a>
                            </div>
                        </div>
                    </div>
                    <div class="center" id="title-logo">
                        <img src="../../IMG/Logo.png" alt="logo">
                        <p><span>NEWS</span><span class="orange-text">LODGE</span></p>
                    </div>
                    <div class="center" id="links">
                        <div id="link-container">
                            <a href="today.html"><span>Today</span></a>
                            <a href="south-africa.html"><span>South Africa</span></a>
                            <a href="world.html"><span>World</span></a>
                            <a href="covid.html"><span>COVID-19</span></a>
                            <a href="calendar.html"><span>Calendar</span></a>
                        </div>
                    </div>
                </nav>
                <script src="JS/general.js"></script>
            </body>
        </html>
    ';
?>