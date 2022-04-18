<?php require_once("php/General/header.php"); ?>
<main>
    <div id="loading-background" class="display">
        <img id="loading" src="img/loading.svg" alt="Loading Screen"/>
        <p>Loading Articles</p>
    </div>
    <section class="general-news">
        <div class="general-header">
            <h2 class="section-title">general</h2>
            <div class="general-filters-container">
                <span class="general-filter" onclick="generalFilter(this)"></span>
            </div>
        </div>
        
        <div class="general-container">
            <div onclick="goToLink(this)" class="general-article-main">
                <a href="" class="link"></a>
                <span class="tag general"></span>
                <div class="overlay"></div>
                <img class="general-main-article-image" src="IMG/blank.png" alt="a">
                <div class="general-main-article-content">
                    <span class="general-main-author-date"></span>
                    <span class="general-main-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="general-article-sub1 general-sub-article-general">
                <div class="overlay"></div>
                <a href="" class="link"></a>
                <img class="general-sub-article-image" src="IMG/blank.png" alt="a">
                <span class="tag general"></span>
                <div class="general-sub-article-content">
                    <span class="general-sub-author-date"></span>
                    <span class="general-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="general-article-sub2 general-sub-article-general">
                <div class="overlay"></div>
                <a href="" class="link"></a>
                <img class="general-sub-article-image" src="IMG/blank.png" alt="a">
                <span class="tag general"></span>
                <div class="general-sub-article-content">
                    <span class="general-sub-author-date"></span>
                    <span class="general-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="general-article-sub3 general-sub-article-general">
                <div class="overlay"></div>
                <a href="" class="link"></a>
                <img class="general-sub-article-image" src="IMG/blank.png" alt="a">
                <span class="tag general"></span>
                <div class="general-sub-article-content">
                    <span class="general-sub-author-date"></span>
                    <span class="general-sub-article-title">No Article Found</span>
                </div>
            </div>
        </div>
    </section>
    <section class="sports-news">
        <div class="sports-header">
            <h2 class="section-title">Sports</h2>
            <div class="sports-filters-container">
                <span class="sports-filter" onclick="sportFilter(this)"></span>
            </div>
        </div>
        
        <div class="sports-container">
            <div onclick="goToLink(this)" class="main-sports-article">
                <a href="" class="link"></a>
                <img class="sport-article-image-main hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag sport"></span>
                <div class="sport-article-content-main">
                    <span class="sport-article-author-main"></span>
                    <span class="sport-article-title-main">No Article Found</span>
                    <span class="sport-article-description-main"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="sport-sub-article1 sport-sub-article-general">
                <a href="" class="link"></a>
                <img class="sport-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag sport"></span>
                <div class="sport-sub-article-content">
                    <span class="sport-sub-author-date"></span>
                    <span class="sport-sub-article-title">No Article Found</span>
                </div> 
            </div>
            <div onclick="goToLink(this)" class="sport-sub-article2 sport-sub-article-general">
                <a href="" class="link"></a>
                <img class="sport-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag sport"></span>
                <div class="sport-sub-article-content">
                    <span class="sport-sub-author-date"></span>
                    <span class="sport-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="sport-sub-article3 sport-sub-article-general">
                <a href="" class="link"></a>
                <img class="sport-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag sport"></span>
                <div class="sport-sub-article-content">
                    <span class="sport-sub-author-date"></span>
                    <span class="sport-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="sport-sub-article4 sport-sub-article-general">
                <a href="" class="link"></a>
                <img class="sport-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag sport"></span>
                <div class="sport-sub-article-content">
                    <span class="sport-sub-author-date"></span>
                    <span class="sport-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="sport-sub-article5 sport-sub-article-general">
                <a href="" class="link"></a>
                <img class="sport-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag sport"></span>
                <div class="sport-sub-article-content">
                    <span class="sport-sub-author-date"></span>
                    <span class="sport-sub-article-title">No Article Found</span>
                </div>
            </div>
            </div>
    </section>
</main>
<script src="JS/world.js"></script>

<?php require_once("php/General/footer.php"); ?>