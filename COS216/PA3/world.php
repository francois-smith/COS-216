<?php require_once("php/General/header.php"); ?>
<main>
    <div id="loading-background" class="display">
        <img id="loading" src="img/loading.svg" alt="Loading Screen"/>
        <p>Loading Articles</p>
    </div>
    <section class="general-News">
        <div class="general-header">
            <h2 class="section-title">General</h2>
            <div class="general-filters-container">
                <span class="general-filter" onclick="getGeneralData()">Find New Articles</span>
            </div>
        </div>

        <div class="general-container">
            <div onclick="goToLink(this)" class="general-article1 general-article-base">
                <a href="" class="link"></a>
                <img class="general-article-image hide-alt" src="IMG/blank.png" alt="a">
                <div class="general-article-content">
                    <span class="general-article-title">No Article Found</span>
                    <div class="general-article-tag-container">
                        <span class="general-tag"></span>
                        <span class="general-article-author"></span>
                    </div>
                    <span class="general-article-description"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="general-article2 general-article-base">
                <a href="" class="link"></a>
                <img class="general-article-image hide-alt" src="IMG/blank.png" alt="a">
                <div class="general-article-content">
                    <span class="general-article-title">No Article Found</span>
                    <div class="general-article-tag-container">
                        <span class="general-tag"></span>
                        <span class="general-article-author"></span>
                    </div>
                    <span class="general-article-description"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="general-article3 general-article-base">
                <a href="" class="link"></a>
                <img class="general-article-image hide-alt" src="IMG/blank.png" alt="a">
                <div class="general-article-content">
                    <span class="general-article-title">No Article Found</span>
                    <div class="general-article-tag-container">
                        <span class="general-tag"></span>
                        <span class="general-article-author"></span>
                    </div>
                    <span class="general-article-description"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="general-article4 general-article-base">
                <a href="" class="link"></a>
                <img class="general-article-image hide-alt" src="IMG/blank.png" alt="a">
                <div class="general-article-content">
                    <span class="general-article-title">No Article Found</span>
                    <div class="general-article-tag-container">
                        <span class="general-tag"></span>
                        <span class="general-article-author"></span>
                    </div>
                    <span class="general-article-description"></span>
                </div>      
            </div>     
        </div>           
    </section>
    <section class="tech-News">
        <div class="tech-header">
            <h2 class="section-title">Technology</h2>
            <div class="tech-filters-container">
                <span class="tech-filter" onclick="techFilter(this)"></span>
            </div>
        </div>

        <div class="tech-container">
            <div onclick="goToLink(this)" class="tech-article-main1 tech-article-main-general">
                <a href="" class="link"></a>
                <img class="tech-article-main-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag tech"></span>
                <div class="tech-article-main-content">
                    <span class="tech-article-main-author"></span>
                    <span class="tech-article-main-title">No Article Found</span>
                    <span class="tech-article-main-description"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="tech-article-main2 tech-article-main-general">
                <a href="" class="link"></a>
                <img class="tech-article-main-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag tech"></span>
                <div class="tech-article-main-content">
                    <span class="tech-article-main-author"></span>
                    <span class="tech-article-main-title">No Article Found</span>
                    <span class="tech-article-main-description"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="tech-article-sub1 tech-article-sub-general">
                <a href="" class="link"></a>
                <img class="tech-article-sub-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag tech"></span>
                <div class="tech-article-sub-content">
                    <span class="tech-article-sub-author"></span>
                    <span class="tech-article-sub-title">No Article Found</span>
                </div> 
            </div>
            <div onclick="goToLink(this)" class="tech-article-sub2 tech-article-sub-general">
                <a href="" class="link"></a>
                <img class="tech-article-sub-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag tech"></span>
                <div class="tech-article-sub-content">
                    <span class="tech-article-sub-author"></span>
                    <span class="tech-article-sub-title">No Article Found</span>
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
    <section class="business-news">
        <div class="business-header">
            <h2 class="section-title">Business</h2>
            <div class="business-filters-container">
                <span class="business-filter" onclick="businessFilter(this)"></span>
            </div>
        </div>
        
        <div class="business-container">
            <div onclick="goToLink(this)" class="business-article-main">
                <a href="" class="link"></a>
                <span class="tag business"></span>
                <div class="overlay"></div>
                <img class="business-main-article-image" src="IMG/blank.png" alt="a">
                <div class="business-main-article-content">
                    <span class="business-main-author-date"></span>
                    <span class="business-main-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="business-article-sub1 business-sub-article-general">
                <div class="overlay"></div>
                <a href="" class="link"></a>
                <img class="business-sub-article-image" src="IMG/blank.png" alt="a">
                <span class="tag business"></span>
                <div class="business-sub-article-content">
                    <span class="business-sub-author-date"></span>
                    <span class="business-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="business-article-sub2 business-sub-article-general">
                <div class="overlay"></div>
                <a href="" class="link"></a>
                <img class="business-sub-article-image" src="IMG/blank.png" alt="a">
                <span class="tag business"></span>
                <div class="business-sub-article-content">
                    <span class="business-sub-author-date"></span>
                    <span class="business-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="business-article-sub3 business-sub-article-general">
                <div class="overlay"></div>
                <a href="" class="link"></a>
                <img class="business-sub-article-image" src="IMG/blank.png" alt="a">
                <span class="tag business"></span>
                <div class="business-sub-article-content">
                    <span class="business-sub-author-date"></span>
                    <span class="business-sub-article-title">No Article Found</span>
                </div>
            </div>
            </div>
    </section>
</main>
<script src="JS/world.js"></script>

<?php require_once("php/General/footer.php"); ?>