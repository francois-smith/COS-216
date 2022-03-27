loadTodayArticles();
var json;

function loadTodayArticles(){
    // selecting loading div
    const loader = document.querySelector("#loading-background");

    loader.classList.remove("display");
    loader.style.display = "none";

    // setTimeout(() => {
    //     loader.classList.remove("display");
    // }, 3000);

    // setTimeout(() => {
    //     loader.style.display = "none";
    // }, 4000);

    const request = new XMLHttpRequest();

    request.open("get", "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP");
    request.onload = () => {
        // try{
            
        // }
        // catch(e) {
        //     console.warn("Could not retrieve API");
        // }

        json = JSON.parse(request.responseText);
        populateInitialTrendingArticles(json);
        populateMainArticle(json);
        populateSubArticles(json);
        generateFilters(json);
    };

    
    request.send();
}

function populateInitialTrendingArticles(json){
    const articles = document.getElementsByClassName("general-article");

    for (let article of articles) {
        //set data variable
        var data = json.results[Math.floor(Math.random()*json.num_results)];

        //set link
        var link = article.querySelector(".link");
        link.setAttribute("href", data.url)

        //set title of article
        var title = article.querySelector('.card-article-title, .card-article-title-small');
        title.innerHTML = data.title;

        //set author and date
        var author_date = article.querySelector('.card-author-date');
        var author = data.byline;
        if(author == "")
        {
            author = "By New York Times";
        } 
        author_date.innerHTML = author + " - " + data.published_date.substr(0, data.published_date.indexOf('T'));

        //set image
        var image = article.querySelector(".card-article-image");
        image.src = data.multimedia[0].url;

        //set tag category with random color
        var tag = article.querySelector(".tag");
        if(data.subsection == "")
        {
            tag.innerHTML = "World";
        }
        else {
            tag.innerHTML = data.section;
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

    //set link
    var link = mainArticle.querySelector(".link");
    link.setAttribute("href", data.url)

    //set author and date
    var author_date = mainArticle.querySelector('.grid-author-date');
    var author = data.byline;
    if(author == "")
    {
        author = "By New York Times";
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
        tag.innerHTML = "World";
    }
    else {
        tag.innerHTML = data.section;
    }   
    tag.style.background = tagGenerator();  
}

function populateSubArticles(json){
    const articles = document.getElementsByClassName("sub-article-general");

    for (let article of articles) {
        //set data variable
        var data = json.results[Math.floor(Math.random()*json.num_results)];

        //set link
        var link = article.querySelector(".link");
        link.setAttribute("href", data.url)

        //set title of article
        var title = article.querySelector('.sub-article-title');
        title.innerHTML = data.title;

        // //set author and date
        var author_date = article.querySelector('.sub-author-date');
        var author = data.byline;
        if(author == "")
        {
            author = "By New York Times";
        } 
        author_date.innerHTML = author + " - " + data.published_date.substr(0, data.published_date.indexOf('T'));

        //set image
        var image = article.querySelector(".grid-article-image-sub");
        image.src = data.multimedia[0].url;

        // //set tag category with random color
        var tag = article.querySelector(".tag");
        tag.innerHTML = data.section;
    }   
}

function generateFilters(json){
    var categories = [];
    const container = document.querySelector(".filters-container");

    json.results.forEach(result => {
        if(categories.indexOf(result.section) == -1 && result.subsection != "") categories.push(result.section);
    });

    var filter = document.querySelector(".filter");
    const clone = filter.cloneNode(true);
    filter.innerHTML = "All";
    filter.style.backgroundColor = tagGenerator();
    container.appendChild(filter);

    for(var i = 0; i < categories.length; i++){
        const clone = filter.cloneNode(true);
        clone.innerHTML = categories[i];
        clone.innerHTML = clone.innerHTML.substring(0,1).toUpperCase() + clone.innerHTML.substring(1).toLowerCase();
        clone.style.backgroundColor = tagGenerator();
        container.appendChild(clone);
    }
}

function tagGenerator(){
    var colors= ["#bbd13d", "#2ECC71", "#A56CBD", "#997C00", "#42C0F5", "#F65050", "#0088FF", "#e7b54a"];

    var i = Math.floor(Math.random()*colors.length);
    return colors[i];
}

function filter(event){
    const filterType = event;
    alert(filterType.innerHTML);
}

function search(){
    var searchText = document.getElementById("searchBox");

    if(searchText.value == ""){
        alert("Enter a valid search result");
        return;
    }

    const request = new XMLHttpRequest();

    var offset = Math.floor(Math.random()*50);
    var requestURL = "https://webit-news-search.p.rapidapi.com/search?q="+ searchText.value +"&language=en&number=50&offset=0"+offset;
    request.open("GET", requestURL);
    request.setRequestHeader("x-rapidapi-host", "webit-news-search.p.rapidapi.com");
    request.setRequestHeader("x-rapidapi-key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        var data = JSON.parse(request.responseText);
        populateSearchResults(data);
    };

    request.send();
}

function goToLink(event){
    var link = event.querySelector(".link").href;
    window.open(link, '_blank').focus();
}

function populateSearchResults(json){
    const articlesList = document.getElementsByClassName("general-article");
    console.log(json);
    var i = 0;

    for (let article of articlesList) {
        //set data variable
        var data = json.data.results[i];
        i += 2;

        console.log(data);

        // //set link
        var link = article.querySelector(".link");
        link.setAttribute("href", data.url)

        // //set title of article
        var title = article.querySelector('.card-article-title, .card-article-title-small');
        if(data.title == ""){
            title.innerHTML = "Visit article for further information";
        }
        else {
            title.innerHTML = data.title;
        }

        // //set author and date
        var author_date = article.querySelector('.card-author-date');
        var author = data.author;
        if(author == null)
        {
            author = "By Unknown Author";
        } 
        author_date.innerHTML = author + " - " + data.date.substr(0, data.date.indexOf(' '));

        // // //set image
        var image = article.querySelector(".card-article-image");
        image.src = data.image;

        // //set tag category with random color
        var tag = article.querySelector(".tag");
        if(data.keywords == null)
        {
             tag.innerHTML = "General";
        }
        else {
             tag.innerHTML = data.keywords[0];
        }   
        tag.style.background = tagGenerator();
    }    
}