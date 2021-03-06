loadTodayArticles();
let json;
setupPage();

function setupPage() {
    let head = document.getElementsByTagName('head')[0]; 

    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/u21649988/COS216/PA4/CSS/Today.css'; 

    head.appendChild(stylesheet); 

    let links = document.getElementById('link-container'); 
    let link = links.querySelectorAll('a')[0];

    link.setAttribute('id', 'active-link');
}

function loadTodayArticles(){
    const request = new XMLHttpRequest();

    request.open("POST", "/u21649988/api.php");
    request.setRequestHeader("Content-type", "application/json");

    date = getDate();
    let requestData = {
        "key": api_key,
        "type":"info",
        "date":date,
        "return":["*"],
        "limit":50
    };
    request.send(JSON.stringify(requestData));
    request.onload = function(){
        json = JSON.parse(this.responseText);
        populateInitialTrendingArticles(json);
        populateMainArticle(json);
        populateSubArticles(json);
    }
}

function populateInitialTrendingArticles(json){
    const articles = document.getElementsByClassName("general-article");

    for (let article of articles) {
        let data = json.data[Math.floor(Math.random()*json.data.length)];

        let id = article.querySelector(".article_id");
        id.innerHTML = data.id;

        let link = article.querySelector(".link");
        link.setAttribute("href", data.link);

        let title = article.querySelector('.card-article-title, .card-article-title-small');
        title.innerHTML = data.title;

        let author_date = article.querySelector('.card-author-date');
        let author = data.author;
        let date = data.date;
        author_date.innerHTML = author + " - " + date.split("T", 1)[0];

        let image = article.querySelector(".card-article-image");
        image.src = data.image;

        let tag = article.querySelector(".tag");
        tag.innerHTML = data.tag;
        tag.style.background = tagGenerator();

        setStars(article, data.rating.avgRating);
    }    
}

function populateMainArticle(json){
    const mainArticle = document.querySelector(".main-article");
    let data = json.data[Math.floor(Math.random()*json.data.length)];

    let id = mainArticle.querySelector(".article_id");
    id.innerHTML = data.id;

    let title = mainArticle.querySelector('.grid-article-title');
    title.innerHTML = data.title;

    let link = mainArticle.querySelector(".link");
    link.setAttribute("href", data.link)

    let author_date = mainArticle.querySelector('.grid-author-date');
    let author = data.author;
    let date = data.date;
    author_date.innerHTML = author + " - " + date.split("T", 1)[0];

    let image = mainArticle.querySelector(".grid-article-image-main");
    image.src = data.image;

    let description  = mainArticle.querySelector(".grid-article-description");
    description.innerHTML = data.description;

    let tag = mainArticle.querySelector(".tag");
    tag.innerHTML = data.tag;  
    tag.style.background = tagGenerator();  

    setStars(mainArticle, data.rating.avgRating);
}

function populateSubArticles(json){
    const articles = document.getElementsByClassName("sub-article-general");

    for (let article of articles) {
        let data = json.data[Math.floor(Math.random()*json.data.length)];

        let id = article.querySelector(".article_id");
        id.innerHTML = data.id;
    
        let link = article.querySelector(".link");
        link.setAttribute("href", data.link);

        let title = article.querySelector('.sub-article-title');
        title.innerHTML = data.title;

        let author_date = article.querySelector('.sub-author-date');
        let author = data.author;
        let date = data.date;
        author_date.innerHTML = author + " - " + date.split("T", 1)[0];

        let image = article.querySelector(".grid-article-image-sub");
        image.src = data.image;

        let tag = article.querySelector(".tag");
        tag.innerHTML = data.tag;

        setStars(article, data.rating.avgRating);
    }   
}

function generateFilters(json){
    let categories = [];
    const container = document.querySelector(".filters-container");

    json.results.forEach(result => {
        if(categories.indexOf(result.section) == -1 && result.subsection != "") categories.push(result.section);
    });

    let filter = document.querySelector(".filter");
    const clone = filter.cloneNode(true);
    filter.innerHTML = "All";
    filter.style.backgroundColor = tagGenerator();
    container.appendChild(filter);

    for(let i = 0; i < categories.length; i++){
        const clone = filter.cloneNode(true);
        clone.innerHTML = categories[i];
        clone.innerHTML = clone.innerHTML.substring(0,1).toUpperCase() + clone.innerHTML.substring(1).toLowerCase();
        clone.style.backgroundColor = tagGenerator();
        container.appendChild(clone);
    }
}

function tagGenerator(){
    let colors= ["#bbd13d", "#2ECC71", "#A56CBD", "#997C00", "#42C0F5", "#F65050", "#0088FF", "#e7b54a"];

    let i = Math.floor(Math.random()*colors.length);
    return colors[i];
}

function search(){
    let searchText = document.getElementById("searchBox");

    if(searchText.value == ""){
        alert("Enter a valid search result");
        return;
    }

    const request = new XMLHttpRequest();

    let offset = Math.floor(Math.random()*8);
    let requestURL = "https://newscatcher.p.rapidapi.com/v1/search_free?q="+searchText.value+"&lang=en&page="+offset+"&page_size=30&media=True";
    request.open("GET", requestURL);
    request.setRequestHeader("X-RapidAPI-Host", "newscatcher.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        let data = JSON.parse(request.responseText);
        populateSearchResults(data, searchText);
    };

    request.send();
}

function goToLink(event){
    let link = event.querySelector(".link").href;
    window.open(link, '_blank').focus();
}

function populateSearchResults(json, searchText){
    const articlesList = document.getElementsByClassName("general-article");
    let i = 0;

    for (let article of articlesList) {
        //set data variable
        let data = json.articles[i];
        i++;

        //set link
        let link = article.querySelector(".link");
        link.setAttribute("href", data.link)

        //set title of article
        let title = article.querySelector('.card-article-title, .card-article-title-small');
        if(data.title == ""){
             title.innerHTML = "Visit article for further information";
        }
        else {
            title.innerHTML = data.title;
        }

        //set image
        let image = article.querySelector(".card-article-image");
        image.src = data.media;

        //set author and date
        let author_date = article.querySelector('.card-author-date');
        let author = data.author;
        if(author == null)
        {
            author = "By Unknown Author";
        } 

        const formatter = new Intl.DateTimeFormat("en-SA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        const date = new Date()
        const result = formatter.format(date);
        author_date.innerHTML = author + " - " + result;

        //set tag category with random color
        let tag = article.querySelector(".tag");
        if(data.topic == null)
        {
            tag.innerHTML = "General";
        }
        else {
            tag.innerHTML = data.topic;
        }   
        tag.style.background = tagGenerator();
    }    
}

function filter(event){
    const filterType = event.innerHTML.toLowerCase();
    const articles = document.getElementsByClassName("sub-article-general");
    let i = 0;

    if(filterType == "all"){
        populateSubArticles(json);
        return;
    }

    let filtered = new Array(5);
    for (let data of json.results) {
        if(data.section == filterType){
            filtered[i] = data;
            i++;
        }

        if(i == 5)
            break;
    }

    for (let article of articles){
        let link = article.querySelector(".link");
        link.setAttribute("href", "")

        //set title of article
        let title = article.querySelector('.sub-article-title');
        title.innerHTML = "No article found.";

        // //set author and date
        let author_date = article.querySelector('.sub-author-date');
        author_date.innerHTML = "";

        //set image
        let image = article.querySelector(".grid-article-image-sub");
        image.src = "";

        // //set tag category with random color
        let tag = article.querySelector(".tag");
        tag.innerHTML = "";
    }

    i = 0;
    for (let article of articles) {
        //set data variable
        let data = filtered[i];
        
        //set link
        let link = article.querySelector(".link");
        link.setAttribute("href", data.url)

        //set title of article
        let title = article.querySelector('.sub-article-title');
        title.innerHTML = data.title;

        // //set author and date
        let author_date = article.querySelector('.sub-author-date');
        let author = data.byline;
        if(author == "")
        {
            author = "By New York Times";
        } 

        const formatter = new Intl.DateTimeFormat("en-SA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        const date = new Date()
        const result = formatter.format(date);
        author_date.innerHTML = author + " - " + result;

        //set image
        let image = article.querySelector(".grid-article-image-sub");
        image.src = data.multimedia[0].url;

        // //set tag category with random color
        let tag = article.querySelector(".tag");
        tag.innerHTML = data.section;
        i++;
    }   
}
