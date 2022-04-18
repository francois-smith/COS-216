<?php require_once("php/General/header.php"); ?>
<main>
    <div id="loading-background" class="display">
        <img id="loading" src="img/loading.svg" alt="Loading Screen"/>
        <p>Loading Articles</p>
    </div>
    <section class="general-news">
        <div class="general-header">
            <h2 class="section-title">General</h2>
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
    <section class="preferences-news">
        <div class="preferences-header">
            <h2 class="section-title">Preferences</h2>
        </div>
        <div class="preferences-container">
            <div onclick="goToLink(this)" class="main-preferences-article">
                <a href="" class="link"></a>
                <img class="preference-article-image-main hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag preference"></span>
                <div class="preference-article-content-main">
                    <span class="preference-article-author-main"></span>
                    <span class="preference-article-title-main">No Article Found</span>
                    <span class="preference-article-description-main"></span>
                </div>      
            </div>
            <div onclick="goToLink(this)" class="preference-sub-article1 preference-sub-article-general">
                <a href="" class="link"></a>
                <img class="preference-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag preference"></span>
                <div class="preference-sub-article-content">
                    <span class="preference-sub-author-date"></span>
                    <span class="preference-sub-article-title">No Article Found</span>
                </div> 
            </div>
            <div onclick="goToLink(this)" class="preference-sub-article2 preference-sub-article-general">
                <a href="" class="link"></a>
                <img class="preference-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag preference"></span>
                <div class="preference-sub-article-content">
                    <span class="preference-sub-author-date"></span>
                    <span class="preference-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="preference-sub-article3 preference-sub-article-general">
                <a href="" class="link"></a>
                <img class="preference-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag preference"></span>
                <div class="preference-sub-article-content">
                    <span class="preference-sub-author-date"></span>
                    <span class="preference-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="preference-sub-article4 preference-sub-article-general">
                <a href="" class="link"></a>
                <img class="preference-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag preference"></span>
                <div class="preference-sub-article-content">
                    <span class="preference-sub-author-date"></span>
                    <span class="preference-sub-article-title">No Article Found</span>
                </div>
            </div>
            <div onclick="goToLink(this)" class="preference-sub-article5 preference-sub-article-general">
                <a href="" class="link"></a>
                <img class="preference-sub-article-image hide-alt" src="IMG/blank.png" alt="a">
                <span class="tag preference"></span>
                <div class="preference-sub-article-content">
                    <span class="preference-sub-author-date"></span>
                    <span class="preference-sub-article-title">No Article Found</span>
                </div>
            </div>
            </div>
    </section>
</main>
<script src="JS/world.js"></script>

<?php require_once("php/General/footer.php"); ?>