loadTodayArticles();

function loadTodayArticles(){
    const request = new XMLHttpRequest();

    request.open("get", "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP");
    request.onload = () => {
        // try{
            
        // }
        // catch(e) {
        //     console.warn("Could not retrieve API");
        // }

        const json = JSON.parse(request.responseText);
        populateTodayArticles(json);
        populateMainArticle(json);
        populateSubArticles(json);
        generateFilters(json);
    };

    
    request.send();
}

function populateTodayArticles(json){
    const articles = document.getElementsByClassName("general-article");

    for (let article of articles) {
        //set data variable
        var data = json.results[Math.floor(Math.random()*json.num_results)];

        //set title of article
        var title = article.querySelector('.card-article-title, .card-article-title-small');
        title.innerHTML = data.title;

        //set author and date
        var author_date = article.querySelector('.card-author-date');
        var author = data.byline.substr(0, data.byline.indexOf(','));
        if(author == "")
        {
            author = "New York Times";
        } 
        author_date.innerHTML = author + " - " + data.published_date.substr(0, data.published_date.indexOf('T'));

        //set image
        var image = article.querySelector(".card-article-image");
        image.src = data.multimedia[0].url;

        //set tag category with random color
        var tag = article.querySelector(".tag");
        if(data.subsection == "")
        {
            tag.innerHTML = "Global";
        }
        else {
            tag.innerHTML = data.subsection;
        }   
        tag.style.background = tagGenerator();
    }    
}

function populateMainArticle(json){
    const mainArticle = document.querySelector(".main-article");

    var data = json.results[Math.floor(Math.random()*json.num_results)];

    //set title of article
    var title = mainArticle.querySelector('.grid-article-title');
    title.innerHTML = data.title;

    //set author and date
    var author_date = mainArticle.querySelector('.grid-author-date');
    var author = data.byline.substr(0, data.byline.indexOf(','));
    if(author == "")
    {
        author = "Unknown Author";
    } 
    author_date.innerHTML = author + " - " + data.published_date.substr(0, data.published_date.indexOf('T'));

    //set image
    var image = mainArticle.querySelector(".grid-article-image-main");
    image.src = data.multimedia[0].url;

    //set description
    var description  = mainArticle.querySelector(".grid-article-description");
    description.innerHTML = data.abstract;

    //set tag category with random color
    var tag = mainArticle.querySelector(".tag");
    if(data.subsection == "")
    {
        tag.innerHTML = "Global";
    }
    else {
        tag.innerHTML = data.subsection;
    }   
    tag.style.background = tagGenerator();  
}

function populateSubArticles(json){
    const articles = document.getElementsByClassName("sub-article-general");

    for (let article of articles) {
        //set data variable
        var data = json.results[Math.floor(Math.random()*json.num_results)];

        //set title of article
        var title = article.querySelector('.sub-article-title');
        title.innerHTML = data.title;

        //set author and date
        var author_date = article.querySelector('.sub-author-date');
        var author = data.byline.substr(0, data.byline.indexOf(','));
        if(author == "")
        {
            author = "Unknown Author";
        } 
        author_date.innerHTML = author + " - " + data.published_date.substr(0, data.published_date.indexOf('T'));

        //set image
        var image = article.querySelector(".grid-article-image-sub");
        image.src = data.multimedia[0].url;

        //set tag category with random color
        var tag = article.querySelector(".tag");
        tag.innerHTML = data.subsection;
    }   
}

function generateFilters(json){
    var categories = [];
    const container = document.querySelector(".filters-container");

    json.results.forEach(result => {
        if(categories.indexOf(result.subsection) == -1 && result.subsection != "") categories.push(result.subsection);
    });

    for(var i = 0; i < categories.length; i++){
        var span = document.createElement("span");
        span.classList.add("filter");
        span.innerHTML = categories[i];
        span.innerHTML = span.innerHTML.substring(0,1).toUpperCase() + span.innerHTML.substring(1).toLowerCase();
        span.style.backgroundColor = tagGenerator();
        container.appendChild(span);
    }
}

function tagGenerator(){
    var colors= ["#bbd13d", "#2ECC71", "#A56CBD", "#997C00", "#42C0F5", "#F65050", "#0088FF", "#e7b54a"];

    var i = Math.floor(Math.random()*colors.length);
    return colors[i];
}