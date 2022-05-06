loader();
setupPage();
let preferenceJSON;
let generalJSON;
getPreferenceData();
getGeneralData();

function setupPage() {
    var head = document.getElementsByTagName('head')[0]; 

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/u21649988/COS216/PA4/CSS/World.css'; 
    head.appendChild(stylesheet); 

    let links = document.getElementById('link-container'); 
    let link = links.querySelectorAll('a')[2];
    link.setAttribute('id', 'active-link');
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

    request.open("POST", "/u21649988/api.php");
    request.setRequestHeader("Content-type", "application/json");

    date = getDate();
    let requestData = {
        "key": api_key,
        "type":"info",
        "return":["*"],
        "limit":50
    };
    request.send(JSON.stringify(requestData));
    request.onload = function(){
        generalJSON = JSON.parse(this.responseText);
        if(generalJSON.data.data == "No articles found matching request criteria"){
            emptyRequest();
        }
        else{
            populateGeneral(generalJSON);
        } 
    }
}

function emptyRequest(){

}

function getPreferenceData(){
    const request = new XMLHttpRequest();

    request.open("POST", "/u21649988/api.php");
    request.setRequestHeader("Content-type", "application/json");

    date = getDate();
    let requestData = {
        "key": api_key,
        "type":"info",
        "tag": preference,
        "return":["*"],
        "limit":50
    };
    request.send(JSON.stringify(requestData));
    request.onload = function(){
        preferenceJSON = JSON.parse(this.responseText);
        if(preferenceJSON.data.data == "No articles found matching request criteria"){
            emptyRequest();
        }
        else{
            if(preference == "none"){
                document.querySelector(".preferences-header").querySelector("h2").innerHTML = "General";
            }
            else{
                document.querySelector(".preferences-header").querySelector("h2").innerHTML = preference;
            }
            
            populatePreference(preferenceJSON);
        }
    }
}

function populateGeneral(json){
    let randomArticle = json.data[Math.floor(Math.random()*json.data.length)];

    let mainArticle = document.querySelector(".general-article-main");
    mainArticle.querySelector(".link").setAttribute("href", randomArticle.link);
    mainArticle.querySelector(".general-main-article-image").src = randomArticle.image;
    mainArticle.querySelector(".general-main-article-title").innerHTML = randomArticle.title;

    let author_date = mainArticle.querySelector('.general-main-author-date');
    let author = randomArticle.author;
    author_date.innerHTML = author + " - " + randomArticle.date.split('T')[0];

    let tag = mainArticle.querySelector(".tag")
    tag.innerHTML = randomArticle.tag;
    tag.style.background = tagGenerator();

    let subArticles = document.getElementsByClassName("general-sub-article-general");
    for(let article of subArticles){
        randomArticle = json.data[Math.floor(Math.random()*json.data.length)];
        article.querySelector(".link").setAttribute("href", randomArticle.link);
        article.querySelector(".general-sub-article-image").src = randomArticle.image;
        article.querySelector(".general-sub-article-title").innerHTML = randomArticle.title;

        let author_date = article.querySelector('.general-sub-author-date');
        let author = randomArticle.author;
        author_date.innerHTML = author + " - " + randomArticle.date.split('T')[0];

        let tag = article.querySelector(".tag");
        tag.innerHTML = randomArticle.tag;
        tag.style.background = tagGenerator();
    }
}

function populatePreference(json){
    let randomArticle = json.data[Math.floor(Math.random()*json.data.length)];

    const mainArticle = document.querySelector(".main-preferences-article");
    let date = randomArticle.date;
    let author = randomArticle.author;
    mainArticle.querySelector(".preference-article-author-main").innerHTML = author + " - " + date.split('T')[0];  

    mainArticle.querySelector(".preference-article-title-main").innerHTML = randomArticle.title;
    mainArticle.querySelector(".preference-article-description-main").innerHTML = randomArticle.description;
    mainArticle.querySelector(".preference-article-image-main").src = randomArticle.image;
    mainArticle.querySelector(".link").setAttribute("href", randomArticle.link);

    let tag = mainArticle.querySelector(".tag");
    tag.innerHTML = randomArticle.tag;
    tag.style.background = tagGenerator();  

    const subArticles = document.getElementsByClassName("preference-sub-article-general");
    for (let article of subArticles){
        randomArticle = json.data[Math.floor(Math.random()*json.data.length)];

        let date = randomArticle.date;
        let author = randomArticle.author;
        article.querySelector(".preference-sub-author-date").innerHTML = author + " - " + date.split('T')[0];  

        article.querySelector(".preference-sub-article-title").innerHTML = randomArticle.title;
        article.querySelector(".preference-sub-article-image").src = randomArticle.image;
        article.querySelector(".link").setAttribute("href", randomArticle.link);

        let tag = article.querySelector(".tag");
        tag.innerHTML = randomArticle.section;
        tag.style.background = tagGenerator();  
    }
}

function goToLink(event){
    var link = event.querySelector(".link").href;
    window.open(link, '_blank').focus();
}

function tagGenerator(){
    var colors= ["#bbd13d", "#2ECC71", "#A56CBD", "#997C00", "#42C0F5", "#F65050", "#0088FF", "#e7b54a"];

    var i = Math.floor(Math.random()*colors.length);
    return colors[i];
}