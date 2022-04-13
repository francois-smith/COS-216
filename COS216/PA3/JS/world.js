let sportsJSON;
let techJSON;
let businessJSON;
let generalJSON;
let businesscategories = [];

loader();
getSportData();
getTechData();
getBusinessData();
getGeneralData();
setupPage();

function setupPage() {
    var head = document.getElementsByTagName('head')[0]; 

    var link = document.createElement('link');
    link.rel = 'stylesheet'; 
    link.type = 'text/css';
    link.href = '/COS216/PA3/CSS/World.css'; 

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

function getGeneralData(){
    const request = new XMLHttpRequest();

    let offset = Math.floor(Math.random()*10);
    request.open("GET", "https://api.nytimes.com/svc/news/v3/content/all/world.json?limit=40&offset="+offset+"&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP");
    request.onload = () => {
        generalJSON = JSON.parse(request.responseText);
        populateGeneralData(generalJSON);
    };
    
    request.send();
}

function populateGeneralData(json){
    let data = json.results;
    let articles = document.getElementsByClassName("general-article-base");

    let goodResults = [];
    for(let article of data){
        if(article.title != null && article.multimedia != null){
            goodResults.push(article);
        }
    }

    let i = 1;
    for(let article of articles){
        article.querySelector(".link").setAttribute("href", goodResults[i].url);
        article.querySelector(".general-article-image").src = goodResults[i].multimedia[2].url;

        let title;
        if(goodResults[i].title == null){
            title = "No article title";
        }
        else{
            title = goodResults[i].title;
        }
        article.querySelector(".general-article-title").innerHTML = title;

        let description;
        if(goodResults[i].abstract == ""){
            description = "No article description given.";
        }
        else{
            description = goodResults[i].abstract;
        }
        article.querySelector(".general-article-description").innerHTML = description;

        let author_date = article.querySelector('.general-article-author');
        let author = goodResults[0].byline;
        if(author == "")
        {
            author = "Unknown Author";
        } 
        author_date.innerHTML = author + " - " + goodResults[i].created_date.split('T')[0];

        let tag = article.querySelector(".general-tag")
        tag.innerHTML = goodResults[i].subsection;
        if(tag.innerHTML == ""){
            tag.innerHTML = goodResults[i].section;
        }
        tag.style.background = tagGenerator();

        i+=4;
    }
}

function getSportData(){
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

    let offset = Math.floor(Math.random()*40);
    request.open("get", "https://api.nytimes.com/svc/news/v3/content/all/technology.json?limit=40&offset="+offset+"&api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP");
    request.onload = () => {
        techJSON = JSON.parse(request.responseText);
        populateTech(techJSON);
        generateTechFilters()
    };
    
    request.send();
}

function getBusinessData(){

    const request = new XMLHttpRequest();

    request.open("GET", "https://cnbc.p.rapidapi.com/news/v2/list?franchiseId=19794221&count=30");
    request.setRequestHeader("X-RapidAPI-Host", "cnbc.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        businessJSON = JSON.parse(request.responseText);
        populateBusiness(businessJSON);
        generateBusinessFilters(businessJSON);
    };
    
    request.send();
}

function populateBusiness(json){
    let data = json.data.sectionsEntries[0].assets;

    let mainArticle = document.querySelector(".business-article-main");
    mainArticle.querySelector(".link").setAttribute("href", data[0].url);
    mainArticle.querySelector(".business-main-article-image").src = data[0].promoImage.url;
    mainArticle.querySelector(".business-main-article-title").innerHTML = data[0].headline;

    let author_date = mainArticle.querySelector('.business-main-author-date');
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
    let subArticles = document.getElementsByClassName("business-sub-article-general");
    for(let article of subArticles){
        article.querySelector(".link").setAttribute("href", data[i].url);
        article.querySelector(".business-sub-article-image").src = data[i].promoImage.url;
        article.querySelector(".business-sub-article-title").innerHTML = data[i].headline;

        let author_date = article.querySelector('.business-sub-author-date');
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

function generateBusinessFilters(json){
    const container = document.querySelector(".business-filters-container");
    
    json.data.sectionsEntries[0].assets.forEach(result => {
        if(businesscategories.indexOf(result.section.shortestHeadline) == -1) businesscategories.push(result.section.shortestHeadline);
    });

    var filter = document.querySelector(".business-filter");
    const clone = filter.cloneNode(true);
    filter.innerHTML = "All";
    filter.style.backgroundColor = tagGenerator();
    container.appendChild(filter);

    for(var i = 0; i < businesscategories.length; i++){
        const clone = filter.cloneNode(true);
        clone.innerHTML = businesscategories[i];
        clone.innerHTML = clone.innerHTML.substring(0,1).toUpperCase() + clone.innerHTML.substring(1).toLowerCase();
        clone.style.backgroundColor = tagGenerator();
        container.appendChild(clone);
    }
}

function businessFilter(event){
    const filterType = event.innerHTML.toLowerCase();
    let filteredResults = [];
   
    if(filterType == "all"){
        populateTech(techJSON);
        return;
    }

    for(let article of businessJSON.data.sectionsEntries[0].assets){
        if(article.section.shortestHeadline != null){ 
            if(article.section.shortestHeadline.toUpperCase() === filterType.toUpperCase()){
                filteredResults.push(article);
            }
        }   
    }

    let mainTechArticle = document.querySelector(".business-article-main");
    mainTechArticle.querySelector(".link").setAttribute("href", "");
    mainTechArticle.querySelector('.business-main-article-title').innerHTML = "No Article Found";
    mainTechArticle.querySelector(".business-main-article-image").src = "";
    mainTechArticle.querySelector('.business-main-author-date').innerHTML = "";
    mainTechArticle.querySelector(".tag").innerHTML = "";


    let subBusinessArticles = document.getElementsByClassName("business-sub-article-general");
    for(let article of subBusinessArticles){
        article.querySelector(".link").setAttribute("href", "");
        article.querySelector('.business-sub-article-title').innerHTML = "No Article Found";
        article.querySelector(".business-sub-article-image").src = "";
        article.querySelector('.business-sub-author-date').innerHTML = "";
        article.querySelector(".tag").innerHTML = "";
    }

    let i = 0;
    for(let article of filteredResults){
        if(i > 3) break;

        if(i < 1){
            mainTechArticle.querySelector(".link").setAttribute("href", article.url);
            mainTechArticle.querySelector(".business-main-article-image").src = article.promoImage.url;
            mainTechArticle.querySelector(".business-main-article-title").innerHTML = article.headline;

            let author_date = mainTechArticle.querySelector('.business-main-author-date');
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
            subBusinessArticles[i-1].querySelector(".link").setAttribute("href", article.url);
            subBusinessArticles[i-1].querySelector(".business-sub-article-image").src = article.promoImage.url;
            subBusinessArticles[i-1].querySelector(".business-sub-article-title").innerHTML = article.headline;

            let author_date = subBusinessArticles[i-1].querySelector('.business-sub-author-date');
            let author = article.authorFormatted;
            if(author == "")
            {
                author = "Unknown Author";
            } 
            author_date.innerHTML = author + " - " + article.dateFirstPublished.split('T')[0];

            let tag = subBusinessArticles[i-1].querySelector(".tag")
            tag.innerHTML = article.section.shortestHeadline;
            tag.style.background = tagGenerator();
        }   
        i++;
    }
}

function populateTech(json){
    let mainTechArticles = document.getElementsByClassName("tech-article-main-general");

    let i = 0;
    for(let article of mainTechArticles){
        let data = json.results[i];

        article.querySelector(".link").setAttribute("href", data.url);
        article.querySelector('.tech-article-main-title').innerHTML = data.title;
        article.querySelector(".tech-article-main-image").src = data.multimedia[2].url;
        article.querySelector(".tech-article-main-description").innerHTML= data.abstract;

        let author_date = article.querySelector('.tech-article-main-author');
        let author = data.byline;
        if(author == "")
        {
            author = "By New York Times";
        } 
        author_date.innerHTML = author + " - " + data.published_date.split('T')[0];

        let tag = article.querySelector(".tag")
        tag.innerHTML = getTag(data.des_facet);
        tag.style.background = tagGenerator();

        i++;
    }

    let subTechArticles = document.getElementsByClassName("tech-article-sub-general");
    for(let article of subTechArticles){
        let data = json.results[i];

        article.querySelector(".link").setAttribute("href", data.url);
        article.querySelector('.tech-article-sub-title').innerHTML = data.title;
        article.querySelector(".tech-article-sub-image").src = data.multimedia[2].url;

        let author_date = article.querySelector('.tech-article-sub-author');
        let author = data.byline;
        if(author == "")
        {
            author = "By New York Times";
        } 
        author_date.innerHTML = author + " - " + data.published_date.split('T')[0];

        let tag = article.querySelector(".tag")
        tag.innerHTML = getTag(data.des_facet);
        tag.style.background = tagGenerator();

        i++;
    }
}

function techFilter(event){
    const filterType = getFilerType(event.innerHTML);
    let filteredResults = [];

    if(filterType == "all"){
        populateTech(techJSON);
        return;
    }

    for(let article of techJSON.results){
        if(article.des_facet != null){ 
            if(article.des_facet.includes(filterType)){
                filteredResults.push(article);
            }
        }   
    }

    let mainTechArticles = document.getElementsByClassName("tech-article-main-general");
    for(let article of mainTechArticles){
        article.querySelector(".link").setAttribute("href", "");
        article.querySelector('.tech-article-main-title').innerHTML = "No Article Found";
        article.querySelector(".tech-article-main-image").src = "";
        article.querySelector(".tech-article-main-description").innerHTML = "";
        article.querySelector('.tech-article-main-author').innerHTML = "";
        article.querySelector(".tag").innerHTML = "";
    }
    let subTechArticles = document.getElementsByClassName("tech-article-sub-general");
    for(let article of subTechArticles){
        article.querySelector(".link").setAttribute("href", "");
        article.querySelector('.tech-article-sub-title').innerHTML = "No Article Found";
        article.querySelector(".tech-article-sub-image").src = "";
        article.querySelector('.tech-article-sub-author').innerHTML = "";
        article.querySelector(".tag").innerHTML = "";
    }

    let i = 0;
    for(let article of filteredResults){
        if(i > 3) break;

        if(i < 2){
            mainTechArticles[i].querySelector(".link").setAttribute("href", article.url);
            mainTechArticles[i].querySelector('.tech-article-main-title').innerHTML = article.title;
            mainTechArticles[i].querySelector(".tech-article-main-image").src = article.multimedia[2].url;
            mainTechArticles[i].querySelector(".tech-article-main-description").innerHTML= article.abstract;

            let author_date = mainTechArticles[i].querySelector('.tech-article-main-author');
            let author = article.byline;
            if(author == "")
            {
                author = "By New York Times";
            } 
            author_date.innerHTML = author + " - " + article.published_date.split('T')[0];

            let tag = mainTechArticles[i].querySelector(".tag")
            tag.innerHTML = getTag(article.des_facet);
            tag.style.background = tagGenerator();
        }
        else{
            subTechArticles[i-2].querySelector(".link").setAttribute("href", article.url);
            subTechArticles[i-2].querySelector('.tech-article-sub-title').innerHTML = article.title;
            subTechArticles[i-2].querySelector(".tech-article-sub-image").src = article.multimedia[2].url;

            let author_date = subTechArticles[i-2].querySelector('.tech-article-sub-author');
            let author = article.byline;
            if(author == "")
            {
                author = "By New York Times";
            } 
            author_date.innerHTML = author + " - " + article.published_date.split('T')[0];

            let tag = subTechArticles[i-2].querySelector(".tag")
            tag.innerHTML = getTag(article.des_facet);
            tag.style.background = tagGenerator();
        }   
        i++;
    }
}

function getFilerType(filter){
    switch(filter){
        case "Social media":
            return "Social Media";

        case "Computers":
            return "Computers and the Internet";
            
        case "Artificial intelligence":
            return "Artificial Intelligence";

        case "Virtual currency":
            return "Virtual Currency";

        case "Mobile":
            return "Mobile Applications";

        case "Streaming":
            return "Video Recordings, Downloads and Streaming";
    }
}

function getTag(filters){
    let array = ["Social Media", "Computers and the Internet", "Artificial Intelligence", "Virtual Currency", "Mobile Applications", "Video Recordings, Downloads and Streaming"];

    for(let filter of filters){
        if(array.includes(filter)){
            switch(filter){
                case "Social Media":
                    return "Social Media";

                case "Computers and the Internet":
                    return "Computers";

                case "Artificial Intelligence":
                    return "AI";

                case "Virtual Currency":
                    return "Virtual Currency";

                case "Mobile Applications":
                    return "Mobile";

                case "Video Recordings, Downloads and Streaming":
                    return "Streaming";
            }
        } 
    }
    return "Technology";
}

function generateTechFilters(){
    var categories = ["Social Media", "Computers", "Artificial intelligence", "Virtual Currency", "Mobile", "Streaming"];
    const container = document.querySelector(".tech-filters-container");

    var filter = document.querySelector(".tech-filter");
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