<?php require_once("php/General/header.php"); ?>
<main>
    <section class="trending-news">
        <h2 class="section-title">Trending News</h2>
        <div class="trending-container">
            <div onclick="goToLink(this)" class="article1 general-article">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="main1_star5" name="rating" value="5">
                        <label for="main1_star5"></label>
                        <input type="radio" id="main1_star4" name="rating" value="4">
                        <label for="main1_star4"></label>
                        <input type="radio" id="main1_star3" name="rating" value="3">
                        <label for="main1_star3"></label>
                        <input type="radio" id="main1_star2" name="rating" value="2">
                        <label for="main1_star2"></label>
                        <input type="radio" id="main1_star1" name="rating" value="1">
                        <label for="main1_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="overlay"></div>
                <img class="card-article-image" src="" alt="a">
                <div class="overlay"></div>
                <span class="tag"></span>
                <div class="card-article-content">
                    <span class="card-author-date"></span>
                    <span class="card-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="article2 general-article">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="main2_star5" name="rating" value="5">
                        <label for="main2_star5"></label>
                        <input type="radio" id="main2_star4" name="rating" value="4">
                        <label for="main2_star4"></label>
                        <input type="radio" id="main2_star3" name="rating" value="3">
                        <label for="main2_star3"></label>
                        <input type="radio" id="main2_star2" name="rating" value="2">
                        <label for="main2_star2"></label>
                        <input type="radio" id="main2_star1" name="rating" value="1">
                        <label for="main2_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="overlay"></div>
                <img class="card-article-image" src="" alt="a">
                <div class="overlay"></div>
                <span class="tag"></span>
                <div class="card-article-content">
                    <span class="card-author-date"></span>
                    <span class="card-article-title-small">No Article Found</span>
                </div>            
            </div>
            <div onclick="goToLink(this)" class="article3 general-article">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="main3_star5" name="rating" value="5">
                        <label for="main3_star5"></label>
                        <input type="radio" id="main3_star4" name="rating" value="4">
                        <label for="main3_star4"></label>
                        <input type="radio" id="main3_star3" name="rating" value="3">
                        <label for="main3_star3"></label>
                        <input type="radio" id="main3_star2" name="rating" value="2">
                        <label for="main3_star2"></label>
                        <input type="radio" id="main3_star1" name="rating" value="1">
                        <label for="main3_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="overlay"></div>
                <img class="card-article-image" src="" alt="a">
                <div class="overlay"></div>
                <span class="tag"></span>
                <div class="card-article-content">
                    <span class="card-author-date"></span>
                    <span class="card-article-title-small">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="article4 general-article">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="main4_star5" name="rating" value="5">
                        <label for="main4_star5"></label>
                        <input type="radio" id="main4_star4" name="rating" value="4">
                        <label for="main4_star4"></label>
                        <input type="radio" id="main4_star3" name="rating" value="3">
                        <label for="main4_star3"></label>
                        <input type="radio" id="main4_star2" name="rating" value="2">
                        <label for="main4_star2"></label>
                        <input type="radio" id="main4_star1" name="rating" value="1">
                        <label for="main4_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="overlay"></div>
                <img class="card-article-image" src="" alt="a">
                <div class="overlay"></div>
                <span class="tag"></span>
                <div class="card-article-content">
                    <span class="card-author-date"></span>
                    <span class="card-article-title">No Article Found</span>
                </div>   
            </div>
        </div>
    </section>
    <section class="latest-news">
        <div class="latest-header">
            <h2 class="section-title">Latest News</h2>
            <div class="filters-container">
                <span class="filter" onclick="filter(this)"></span>
            </div>
        </div>
        
        <div class="latest-container">
            <div onclick="goToLink(this)" class="main-article">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="sub1_star5" name="rating" value="5">
                        <label for="sub1_star5"></label>
                        <input type="radio" id="sub1_star4" name="rating" value="4">
                        <label for="sub1_star4"></label>
                        <input type="radio" id="sub1_star3" name="rating" value="3">
                        <label for="sub1_star3"></label>
                        <input type="radio" id="sub1_star2" name="rating" value="2">
                        <label for="sub1_star2"></label>
                        <input type="radio" id="sub1_star1" name="rating" value="1">
                        <label for="sub1_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <img class="grid-article-image-main" src="" alt="a">
                <span class="tag"></span>
                <div class="grid-article-content">
                    <span class="grid-author-date"></span>
                    <span class="grid-article-title">No Article Found</span>
                    <span class="grid-article-description"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="sub-article1 sub-article-general">
                <a href="" class="link"></a>
                <div class="grid-article-image-sub-container">
                    <img class="grid-article-image-sub" src="" alt="a">
                    <div class="rating_container" onclick="rate(event)">
                        <div class="rating-stars">
                            <input type="radio" id="sub2_star5" name="rating" value="5">
                            <label for="sub2_star5"></label>
                            <input type="radio" id="sub2_star4" name="rating" value="4">
                            <label for="sub2_star4"></label>
                            <input type="radio" id="sub2_star3" name="rating" value="3">
                            <label for="sub2_star3"></label>
                            <input type="radio" id="sub2_star2" name="rating" value="2">
                            <label for="sub2_star2"></label>
                            <input type="radio" id="sub2_star1" name="rating" value="1">
                            <label for="sub2_star1"></label>
                        </div>
                    </div>
                </div>
                <span class="tag"></span>
                <div class="sub-article-content">
                    <span class="sub-author-date"></span>
                    <span class="sub-article-title">No Article Found</span>
                </div> 
            </div>
            <div onclick="goToLink(this)" class="sub-article2 sub-article-general">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="sub3_star5" name="rating" value="5">
                        <label for="sub3_star5"></label>
                        <input type="radio" id="sub3_star4" name="rating" value="4">
                        <label for="sub3_star4"></label>
                        <input type="radio" id="sub3_star3" name="rating" value="3">
                        <label for="sub3_star3"></label>
                        <input type="radio" id="sub3_star2" name="rating" value="2">
                        <label for="sub3_star2"></label>
                        <input type="radio" id="sub3_star1" name="rating" value="1">
                        <label for="sub3_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <img class="grid-article-image-sub" src="" alt="a">
                <span class="tag"></span>
                <div class="sub-article-content">
                    <span class="sub-author-date"></span>
                    <span class="sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="sub-article3 sub-article-general">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="sub4_star5" name="rating" value="5">
                        <label for="sub4_star5"></label>
                        <input type="radio" id="sub4_star4" name="rating" value="4">
                        <label for="sub4_star4"></label>
                        <input type="radio" id="sub4_star3" name="rating" value="3">
                        <label for="sub4_star3"></label>
                        <input type="radio" id="sub4_star2" name="rating" value="2">
                        <label for="sub4_star2"></label>
                        <input type="radio" id="sub4_star1" name="rating" value="1">
                        <label for="sub4_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="grid-article-image-sub-container">
                    <img class="grid-article-image-sub" src="" alt="a">
                </div>
                <span class="tag"></span>
                <div class="sub-article-content">
                    <span class="sub-author-date"></span>
                    <span class="sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="sub-article4 sub-article-general">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="sub5_star5" name="rating" value="5">
                        <label for="sub5_star5"></label>
                        <input type="radio" id="sub5_star4" name="rating" value="4">
                        <label for="sub5_star4"></label>
                        <input type="radio" id="sub5_star3" name="rating" value="3">
                        <label for="sub5_star3"></label>
                        <input type="radio" id="sub5_star2" name="rating" value="2">
                        <label for="sub5_star2"></label>
                        <input type="radio" id="sub5_star1" name="rating" value="1">
                        <label for="sub5_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="grid-article-image-sub-container">
                    <img class="grid-article-image-sub" src="" alt="a">
                </div>
                <span class="tag"></span>
                <div class="sub-article-content">
                    <span class="sub-author-date"></span>
                    <span class="sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="sub-article5 sub-article-general">
                <div class="rating_container" onclick="rate(event)">
                    <div class="rating-stars">
                        <input type="radio" id="sub6_star5" name="rating" value="5">
                        <label for="sub6_star5"></label>
                        <input type="radio" id="sub6_star4" name="rating" value="4">
                        <label for="sub6_star4"></label>
                        <input type="radio" id="sub6_star3" name="rating" value="3">
                        <label for="sub6_star3"></label>
                        <input type="radio" id="sub6_star2" name="rating" value="2">
                        <label for="sub6_star2"></label>
                        <input type="radio" id="sub6_star1" name="rating" value="1">
                        <label for="sub6_star1"></label>
                    </div>
                </div>
                <a href="" class="link"></a>
                <div class="grid-article-image-sub-container">
                    <img class="grid-article-image-sub" src="" alt="a">
                </div>
                <span class="tag"></span>
                <div class="sub-article-content">
                    <span class="sub-author-date"></span>
                    <span class="sub-article-title">No Article Found</span>
                </div>
            </div>
            </div>
    </section>
</main>
<script src="JS/today.js"></script>

<?php require_once("php/General/footer.php"); ?>