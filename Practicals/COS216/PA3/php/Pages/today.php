<?php
    echo'
        <head>
            <link rel="stylesheet" href="CSS/Today.css">
        </head>
        <main>
            <div id="loading-background" class="display">
                <img id="loading" src="img/loading.svg" alt="Loading Screen"/>
                <p>Loading Articles</p>
            </div>
            <section class="trending-news">
                <h2 class="section-title">Trending News</h2>
                <div class="trending-container">
                    <div onclick="goToLink(this)" class="article1 general-article">
                        <a href="" class="link"></a>
                        <div class="overlay"></div>
                        <img class="card-article-image" src="" alt="a">
                        <span class="tag"></span>
                        <div class="card-article-content">
                            <span class="card-author-date"></span>
                            <span class="card-article-title">No Article Found</span>
                        </div>
                    </div>
                    <div onclick="goToLink(this)" class="article2 general-article">
                        <a href="" class="link"></a>
                        <div class="overlay"></div>
                        <img class="card-article-image" src="" alt="a">
                        <span class="tag"></span>
                        <div class="card-article-content">
                            <span class="card-author-date"></span>
                            <span class="card-article-title-small">No Article Found</span>
                        </div>            
                    </div>
                    <div onclick="goToLink(this)" class="article3 general-article">
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
                        <img class="grid-article-image-sub" src="" alt="a">
                        <span class="tag"></span>
                        <div class="sub-article-content">
                            <span class="sub-author-date"></span>
                            <span class="sub-article-title">No Article Found</span>
                        </div> 
                    </div>
                    <div onclick="goToLink(this)" class="sub-article2 sub-article-general">
                        <a href="" class="link"></a>
                        <img class="grid-article-image-sub" src="" alt="a">
                        <span class="tag"></span>
                        <div class="sub-article-content">
                            <span class="sub-author-date"></span>
                            <span class="sub-article-title">No Article Found</span>
                        </div>
                    </div>
                    <div onclick="goToLink(this)" class="sub-article3 sub-article-general">
                        <a href="" class="link"></a>
                        <img class="grid-article-image-sub" src="" alt="a">
                        <span class="tag"></span>
                        <div class="sub-article-content">
                            <span class="sub-author-date"></span>
                            <span class="sub-article-title">No Article Found</span>
                        </div>
                    </div>
                    <div onclick="goToLink(this)" class="sub-article4 sub-article-general">
                        <a href="" class="link"></a>
                        <img class="grid-article-image-sub" src="" alt="a">
                        <span class="tag"></span>
                        <div class="sub-article-content">
                            <span class="sub-author-date"></span>
                            <span class="sub-article-title">No Article Found</span>
                        </div>
                    </div>
                    <div onclick="goToLink(this)" class="sub-article5 sub-article-general">
                        <a href="" class="link"></a>
                        <img class="grid-article-image-sub" src="" alt="a">
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
    ';
?>