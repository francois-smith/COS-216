getWeather();
getNews();
loader();
setupPage();

function setupPage() {
    let head = document.getElementsByTagName('head')[0]; 

    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/COS216/PA3/CSS/SouthAfrica.css'; 

    head.appendChild(stylesheet); 

    let links = document.getElementById('link-container'); 
    let link = links.querySelectorAll('a')[1];

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

function getNews(){
    const request = new XMLHttpRequest();

    request.open("GET", "http://api.mediastack.com/v1/news?access_key=7c2da267305e87eeca21143f460ae7fb&languages=en&countries=za&sources=-News24&offset=2");
    request.onload = () => {
        let json = JSON.parse(request.responseText);
        populateNews(json);
    };
    
    request.send();
}

function populateNews(json){


    let data = json.data;
    let goodArticles = [];

    for(let article of data){
        if(article.image != null){
            goodArticles.push(article);
        }
    }

    let articles = document.getElementsByClassName("general-latest-article");

    let i = 0;
    for(let article of articles){
        article.querySelector("a").setAttribute("href", goodArticles[i].url);
        article.querySelector(".latest-article-image").src = goodArticles[i].image;
        article.querySelector(".latest-article-title").innerHTML = goodArticles[i].title;
        article.querySelector(".latest-article-description").innerHTML = goodArticles[i].description.substring(0, 300);

        let author = goodArticles[i].author;
        if(author == null){
            author = "Unknown Author";
        }
        let date = goodArticles[i].published_at;
        article.querySelector(".latest-article-author").innerHTML = author + " - " + date.split('T')[0];  

        let tag = article.querySelector(".tag");
        tag.innerHTML = goodArticles[i].category;
        tag.style.backgroundColor = tagGenerator();
        
        i++;
    }
}

function tagGenerator(){
    var colors= ["#80B1D3", "#cc9c43", "#F47F71", "#8ED2C8", "#BC80B7", "#D9D9D8", "#F2AFD1", "#cac24c", "#BFBCDA"];

    var i = Math.floor(Math.random()*colors.length);
    return colors[i];
}


function getWeather(){
    const request = new XMLHttpRequest();

    request.open("GET", "https://weatherapi-com.p.rapidapi.com/current.json?q=pretoria");
    request.setRequestHeader("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        let json = JSON.parse(request.responseText);
        populateWeather(json);
    };
    
    request.send();
}

function populateWeather(json){
    const types = ["Sunny", "Partly cloudy", "Moderate or heavy rain shower", "Clear", "Light rain", "Cloudy"];

    let weatherIcon = document.getElementById("weather-icon");
    let weatherType = document.getElementById("weather-type");
    document.getElementById("weather-region").innerHTML = json.location.name;
    document.getElementById("weather-temp").innerHTML = json.current.feelslike_c;

    let condition = json.current.condition.text;
    if(types.includes(condition)){
        switch(condition) {
            case "Sunny", "Clear":
                weatherIcon.src = "img/Weather-Sprites/day.svg";
                weatherType.innerHTML = "Sunny";
                break;
            case "Partly cloudy":
                weatherIcon.src = "img/Weather-Sprites/cloud-day.svg";
                weatherType.innerHTML = "Partly Cloudy";
                break;
            case "Moderate or heavy rain shower":
                weatherIcon.src = "img/Weather-Sprites/thunder.svg";
                weatherType.innerHTML = "Thunderstorms";
                break;
            case "Light rain":
                weatherIcon.src = "img/Weather-Sprites/rainy.svg";
                weatherType.innerHTML = "Light Rain";
                break;
            case "Cloudy":
                weatherIcon.src = "img/Weather-Sprites/cloudy.svg";
                weatherType.innerHTML = "Cloudy";
                break;
        }   
    }
    else{
        weatherIcon.src = "img/Weather-Sprites/day.svg";
        weatherType.innerHTML = "Sunny";
    }
}