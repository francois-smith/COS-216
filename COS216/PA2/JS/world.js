var sportsJSON;
var techJSON;
//getSportData();
getTechData();

function getSportData(){
    //const loader = document.querySelector("#loading-background");

    //loader.classList.remove("display");
    //loader.style.display = "none";

    // setTimeout(() => {
    //     loader.classList.remove("display");
    // }, 3000);

    // setTimeout(() => {
    //     loader.style.display = "none";
    // }, 4000);

    const request = new XMLHttpRequest();

    request.open("GET", "https://livescore6.p.rapidapi.com/news/v2/list");
    request.setRequestHeader("X-RapidAPI-Host", "livescore6.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        sportsJSON = JSON.parse(request.responseText);
        populateSports(sportsJSON);
        generateSportsFilters(sportsJSON)
    };
    
    request.send();
}

function getTechData(){
    const request = new XMLHttpRequest();

    request.open("GET", 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&fq=news_desk:("Technology")&api-key=VUbv6VyQWcs3gVCvfI4abphAi5OkDhAt')
    request.onload = () => {
        techJSON = JSON.parse(request.responseText);
        populateTech(techJSON);
        generateTechFilters(techJSON)
    };
    
    request.send();
}

function populateTech(json){
    console.log(json);
}

function generateTechFilters(json){

}

function populateSports(json){
    let i = 0;

    const mainArticle = document.querySelector(".main-sports-article");

    let date = json.topStories[i].publishedAt;
    mainArticle.querySelector(".sport-article-author-main").innerHTML = json.topStories[i].authors[0].name + " - " + date.split('T')[0];  

    mainArticle.querySelector(".sport-article-title-main").innerHTML = json.topStories[i].title;
    mainArticle.querySelector(".sport-article-description-main").innerHTML = json.topStories[i].seo.description;
    mainArticle.querySelector(".sport-article-image-main").src = json.topStories[i].mainMedia.gallery.url;
    mainArticle.querySelector(".link").setAttribute("href", "https://www.livescore.com" + json.topStories[i].url);

    let tag = mainArticle.querySelector(".tag");
    tag.innerHTML = json.topStories[i].categoryLabel;
    tag.style.background = tagGenerator();  

    i++;

    const subArticles = document.getElementsByClassName("sport-sub-article-general");
    for (let article of subArticles){
        let date = json.topStories[i].publishedAt;
        article.querySelector(".sport-sub-author-date").innerHTML = json.topStories[i].authors[0].name + " - " + date.split('T')[0];  

        article.querySelector(".sport-sub-article-title").innerHTML = json.topStories[i].title;
        article.querySelector(".sport-sub-article-image").src = json.topStories[i].mainMedia.gallery.url;
        article.querySelector(".link").setAttribute("href", "https://www.livescore.com" + json.topStories[i].url);

        let tag = article.querySelector(".tag");
        tag.innerHTML = json.topStories[i].categoryLabel;
        tag.style.background = tagGenerator();  
        
        i++;
    }
}

function goToLink(event){
    var link = event.querySelector(".link").href;
    window.open(link, '_blank').focus();
}

function generateSportsFilters(json){
    var categories = [];
    const container = document.querySelector(".sports-filters-container");

    json.homepageArticles.forEach(result => {
        if(categories.indexOf(result.category.title) == -1) categories.push(result.category.title);
    });

    var filter = document.querySelector(".sports-filter");
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

function sportFilter(event){
    const filterType = event.innerHTML.toLowerCase();
    var i = 0;

    if(filterType == "all"){
        populateSports(sportsJSON);
        return;
    }

    let category;
    for (let item of sportsJSON.homepageArticles){
        if(item.category.title == filterType){
            category = item;
            break;
        }
    }

    let loopNum;
    const subArticles = document.getElementsByClassName("sport-sub-article-general");
    if(category.articles.length-1 >= subArticles.length){
        loopNum = 5;
    }
    else{
        loopNum = category.articles.length-1;
    }

    let date = category.articles[0].publishedAt;

    const mainArticle = document.querySelector(".main-sports-article");

    let author;
    if(category.articles[0].authors.length == 0){
        author = "Unknown Author";
    }
    else{
        author = category.articles[0].authors[0].name;
    }
    console.log(category.articles[0]);

    mainArticle.querySelector(".sport-article-author-main").innerHTML = author + " - " + date.split('T')[0];  
    mainArticle.querySelector(".sport-article-title-main").innerHTML = category.articles[0].title;
    mainArticle.querySelector(".sport-article-description-main").innerHTML = category.articles[0].seo.description;
    mainArticle.querySelector(".sport-article-image-main").src = category.articles[0].mainMedia.gallery.url;
    mainArticle.querySelector(".link").setAttribute("href", "https://www.livescore.com" + category.articles[0].url);

    let tag = mainArticle.querySelector(".tag");
    tag.innerHTML = category.articles[0].categoryLabel;
    tag.style.background = tagGenerator();  


    for (let article of subArticles){
        article.querySelector(".sport-sub-author-date").innerHTML = "";  
        article.querySelector(".sport-sub-article-title").innerHTML = "";
        article.querySelector(".sport-sub-article-image").src = "";
        article.querySelector(".link").setAttribute("href", "");
        article.querySelector(".tag").innerHTML = "";
    }
    for (let i=0 ; i < loopNum; i++){
        let date = category.articles[i+1].publishedAt;
        let author;
        if(category.articles[i+1].authors.length == 0){
            author = "Unknown Author";
        }
        else{
            author = category.articles[i+1].authors[0].name;
        }
        subArticles[i].querySelector(".sport-sub-author-date").innerHTML = author + " - " + date.split('T')[0];  
        subArticles[i].querySelector(".sport-sub-article-title").innerHTML = category.articles[i+1].title;
        subArticles[i].querySelector(".sport-sub-article-image").src = category.articles[i+1].mainMedia.gallery.url;
        subArticles[i].querySelector(".link").setAttribute("href", "https://www.livescore.com" + category.articles[i+1].url);

        let tag = subArticles[i+1].querySelector(".tag");
        tag.innerHTML = category.articles[i+1].categoryLabel;
        tag.style.background = tagGenerator();  
    }
}