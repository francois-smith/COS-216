loader();
setupPage();
let sportsJSON;
let generalJSON;
//getSportData();
//getGeneralData();

function setupPage() {
    var head = document.getElementsByTagName('head')[0]; 

    var link = document.createElement('link');
    link.rel = 'stylesheet'; 
    link.type = 'text/css';
    link.href = '/u21649988/COS216/PA3/CSS/World.css'; 

    head.appendChild(link); 
}

function loader(){
    const loader = document.querySelector("#loading-background");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 3000);

    setTimeout(() => {
        loader.style.display = "none";
    }, 4000);
}

function getSportData(){
    const request = new XMLHttpRequest();

    request.open("GET", "https://livescore6.p.rapidapi.com/news/v2/list?rapidapi-key=d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        sportsJSON = JSON.parse(request.responseText);
        console.log(sportsJSON);

        //populateSports(sportsJSON);
        //generateSportsFilters(sportsJSON)
    };
    
    request.send();
}

function getTechData(){
    const request = new XMLHttpRequest();

    let offset = Math.floor(Math.random()*40);
    request.open("get", "https://api.nytimes.com/svc/news/v3/content/all/technology.json?limit=40&offset="+offset+"&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP");
    request.onload = () => {
        techJSON = JSON.parse(request.responseText);
        populateTech(techJSON);
        generateTechFilters()
    };
    
    request.send();
}

function getGeneralData(){

    const request = new XMLHttpRequest();

    request.open("GET", "https://cnbc.p.rapidapi.com/news/v2/list?franchiseId=19794221&count=30");
    request.setRequestHeader("X-RapidAPI-Host", "cnbc.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        generalJSON = JSON.parse(request.responseText);
        populateGeneral(generalJSON);
    };
    
    request.send();
}

function populateGeneral(json){
    let data = json.data.sectionsEntries[0].assets;

    let mainArticle = document.querySelector(".General-article-main");
    mainArticle.querySelector(".link").setAttribute("href", data[0].url);
    mainArticle.querySelector(".General-main-article-image").src = data[0].promoImage.url;
    mainArticle.querySelector(".General-main-article-title").innerHTML = data[0].headline;

    let author_date = mainArticle.querySelector('.General-main-author-date');
    let author = data[0].authorFormatted;
    if(author == "")
    {
        author = "Unknown Author";
    } 
    author_date.innerHTML = author + " - " + data[0].dateFirstPublished.split('T')[0];

    let tag = mainArticle.querySelector(".tag")
    tag.innerHTML = data[0].section.shortestHeadline;
    tag.style.background = tagGenerator();

    let i = 1;
    let subArticles = document.getElementsByClassName("General-sub-article-general");
    for(let article of subArticles){
        article.querySelector(".link").setAttribute("href", data[i].url);
        article.querySelector(".General-sub-article-image").src = data[i].promoImage.url;
        article.querySelector(".General-sub-article-title").innerHTML = data[i].headline;

        let author_date = article.querySelector('.General-sub-author-date');
        let author = data[0].authorFormatted;
        if(author == "")
        {
            author = "Unknown Author";
        } 
        author_date.innerHTML = author + " - " + data[0].dateFirstPublished.split('T')[i];

        let tag = article.querySelector(".tag")
        tag.innerHTML = data[i].section.shortestHeadline;
        tag.style.background = tagGenerator();

        i++;
    }
}

function GeneralFilter(event){
    const filterType = event.innerHTML.toLowerCase();
    let filteredResults = [];
   
    if(filterType == "all"){
        populateTech(techJSON);
        return;
    }

    for(let article of generalJSON.data.sectionsEntries[0].assets){
        if(article.section.shortestHeadline != null){ 
            if(article.section.shortestHeadline.toUpperCase() === filterType.toUpperCase()){
                filteredResults.push(article);
            }
        }   
    }

    let mainTechArticle = document.querySelector(".General-article-main");
    mainTechArticle.querySelector(".link").setAttribute("href", "");
    mainTechArticle.querySelector('.General-main-article-title').innerHTML = "No Article Found";
    mainTechArticle.querySelector(".General-main-article-image").src = "";
    mainTechArticle.querySelector('.General-main-author-date').innerHTML = "";
    mainTechArticle.querySelector(".tag").innerHTML = "";


    let subGeneralArticles = document.getElementsByClassName("General-sub-article-general");
    for(let article of subGeneralArticles){
        article.querySelector(".link").setAttribute("href", "");
        article.querySelector('.General-sub-article-title').innerHTML = "No Article Found";
        article.querySelector(".General-sub-article-image").src = "";
        article.querySelector('.General-sub-author-date').innerHTML = "";
        article.querySelector(".tag").innerHTML = "";
    }

    let i = 0;
    for(let article of filteredResults){
        if(i > 3) break;

        if(i < 1){
            mainTechArticle.querySelector(".link").setAttribute("href", article.url);
            mainTechArticle.querySelector(".General-main-article-image").src = article.promoImage.url;
            mainTechArticle.querySelector(".General-main-article-title").innerHTML = article.headline;

            let author_date = mainTechArticle.querySelector('.General-main-author-date');
            let author = article.authorFormatted;
            if(author == "")
            {
                author = "Unknown Author";
            } 
            author_date.innerHTML = author + " - " + article.dateFirstPublished.split('T')[0];

            let tag = mainTechArticle.querySelector(".tag")
            tag.innerHTML = article.section.shortestHeadline;
            tag.style.background = tagGenerator();
        }
        else{
            subGeneralArticles[i-1].querySelector(".link").setAttribute("href", article.url);
            subGeneralArticles[i-1].querySelector(".General-sub-article-image").src = article.promoImage.url;
            subGeneralArticles[i-1].querySelector(".General-sub-article-title").innerHTML = article.headline;

            let author_date = subGeneralArticles[i-1].querySelector('.General-sub-author-date');
            let author = article.authorFormatted;
            if(author == "")
            {
                author = "Unknown Author";
            } 
            author_date.innerHTML = author + " - " + article.dateFirstPublished.split('T')[0];

            let tag = subGeneralArticles[i-1].querySelector(".tag")
            tag.innerHTML = article.section.shortestHeadline;
            tag.style.background = tagGenerator();
        }   
        i++;
    }
}

function populateSports(json){
    let i = 0;

    const mainArticle = document.querySelector(".main-sports-article");

    let date = json.topStories[i].publishedAt;
    let author;
    if(json.topStories[i].authors[0] != null){ 
        author = json.topStories[i].authors[0].name;
    }
    else {
        author = "Unknown Author";
    }
    mainArticle.querySelector(".sport-article-author-main").innerHTML =  + " - " + date.split('T')[0];  

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
        let author;
        if(json.topStories[i].authors[0] != null){ 
            author = json.topStories[i].authors[0].name;
        }
        else {
            author = "Unknown Author";
        }
        article.querySelector(".sport-sub-author-date").innerHTML = author + " - " + date.split('T')[0];  

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
        article.querySelector(".sport-sub-article-title").innerHTML = "No Article Found";
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

        let tag = subArticles[i].querySelector(".tag");
        tag.innerHTML = category.articles[i+1].categoryLabel;
        tag.style.background = tagGenerator();  
    }
}