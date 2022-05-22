<?php require_once("php/General/header.php"); ?>
<main>
    <section class="latest-news">
        <div class="latest-news-container">
            <div class="latest-article1 general-latest-article article">
                <span class="article_id"></span>
                <a href="">
                    <div class="img-container">
                        <img class="latest-article-image" src="" alt="a">
                        <div class="rating_container" onclick="rate(event)">
                            <div class="rating-stars">
                                <input type="radio" id="art1_star5" name="rating" value="5">
                                <label for="art1_star5"></label>
                                <input type="radio" id="art1_star4" name="rating" value="4">
                                <label for="art1_star4"></label>
                                <input type="radio" id="art1_star3" name="rating" value="3">
                                <label for="art1_star3"></label>
                                <input type="radio" id="art1_star2" name="rating" value="2">
                                <label for="art1_star2"></label>
                                <input type="radio" id="art1_star1" name="rating" value="1">
                                <label for="art1_star1"></label>
                            </div>
                        </div>
                    </div>
                    <div class="latest-article-content">
                        <span class="latest-article-title">No Article Found</span>
                        <div>
                            <span class="tag gauteng"></span>
                            <span class="latest-article-author"></span>
                        </div>
                        <p class="latest-article-description"></p>
                    </div>
                </a>      
            </div>
            <div class="latest-article2 general-latest-article article">
                <span class="article_id"></span>
                <a href="">
                    <div class="img-container">
                        <img class="latest-article-image" src="" alt="a">
                        <div class="rating_container" onclick="rate(event)">
                            <div class="rating-stars">
                                <input type="radio" id="art2_star5" name="rating" value="5">
                                <label for="art2_star5"></label>
                                <input type="radio" id="art2_star4" name="rating" value="4">
                                <label for="art2_star4"></label>
                                <input type="radio" id="art2_star3" name="rating" value="3">
                                <label for="art2_star3"></label>
                                <input type="radio" id="art2_star2" name="rating" value="2">
                                <label for="art2_star2"></label>
                                <input type="radio" id="art2_star1" name="rating" value="1">
                                <label for="art2_star1"></label>
                            </div>
                        </div>
                    </div>
                    <div class="latest-article-content">
                        <span class="latest-article-title">No Article Found</span>
                        <div>
                            <span class="tag freestate"></span>
                            <span class="latest-article-author"></span>
                        </div>
                        <p class="latest-article-description"></p>
                    </div>
                </a>

            </div>
            <div class="latest-article3 general-latest-article article">
                <span class="article_id"></span>
                <a href="">
                    <div class="img-container">
                        <img class="latest-article-image" src="" alt="a">
                        <div class="rating_container" onclick="rate(event)">
                            <div class="rating-stars">
                                <input type="radio" id="art3_star5" name="rating" value="5">
                                <label for="art3_star5"></label>
                                <input type="radio" id="art3_star4" name="rating" value="4">
                                <label for="art3_star4"></label>
                                <input type="radio" id="art3_star3" name="rating" value="3">
                                <label for="art3_star3"></label>
                                <input type="radio" id="art3_star2" name="rating" value="2">
                                <label for="art3_star2"></label>
                                <input type="radio" id="art3_star1" name="rating" value="1">
                                <label for="art3_star1"></label>
                            </div>
                        </div>
                    </div>
                    <div class="latest-article-content">
                        <span class="latest-article-title">No Article Found</span>
                        <div>
                            <span class="tag all"></span>
                            <span class="latest-article-author"></span>
                        </div>
                        <p class="latest-article-description"></p>
                    </div>
                </a>
            </div>
            <div class="latest-article4 general-latest-article article">
                <span class="article_id"></span>
                <a href="">
                    <div class="img-container">
                        <img class="latest-article-image" src="" alt="a">
                        <div class="rating_container" onclick="rate(event)">
                            <div class="rating-stars">
                                <input type="radio" id="art4_star5" name="rating" value="5">
                                <label for="art4_star5"></label>
                                <input type="radio" id="art4_star4" name="rating" value="4">
                                <label for="art4_star4"></label>
                                <input type="radio" id="art4_star3" name="rating" value="3">
                                <label for="art4_star3"></label>
                                <input type="radio" id="art4_star2" name="rating" value="2">
                                <label for="art4_star2"></label>
                                <input type="radio" id="art4_star1" name="rating" value="1">
                                <label for="art4_star1"></label>
                            </div>
                        </div>
                    </div>
                    <div class="latest-article-content">
                        <span class="latest-article-title">No Article Found</span>
                        <div>
                            <span class="tag gauteng"></span>
                            <span class="latest-article-author"></span>
                        </div>
                        <p class="latest-article-description"></p>
                    </div>
                </a> 
            </div>
            <div class="side-bar">
                <div id="weather-section">
                    <img id="weather-icon" src="img/Weather-Sprites/day.svg" alt="weather">
                    <span id="weather-region"></span>  
                    <span id="weather-type"></span>
                    <div id="temprature">
                        <span id="weather-temp"></span>
                        <span id="weather-symbol">&#176;</span>
                    </div>
                </div>
                <div id="social-links">
                    <ul>
                        <li id="facebook">
                            <div class="social-text">
                                <i class="fab fa-facebook-square"></i>
                                Facebook
                            </div>
                            <span class="social-prompt">Like</span>
                        </li>
                        <li id="instagram">
                            <div class="social-text">
                                <i class="fab fa-instagram"></i>
                                Instagram
                            </div>
                            <span class="social-prompt">Follow</span>
                        </li>
                        <li id="twitter">
                            <div class="social-text">
                                <i class="fab fa-twitter-square"></i>
                                Twitter
                            </div>
                            <span class="social-prompt">Follow</span>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
    </section>
</main>
<script src="JS/sa.js"></script>

<?php require_once("php/General/footer.php"); ?>