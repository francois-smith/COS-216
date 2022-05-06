getWeather();
getNews();
loader();
setupPage();

function setupPage() {
    let head = document.getElementsByTagName('head')[0]; 

    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/u21649988/COS216/PA4/CSS/SouthAfrica.css'; 

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

    request.open("POST", "/u21649988/api.php");
    request.setRequestHeader("Content-type", "application/json");

    date = getDate();
    let requestData = {
        "key": api_key,
        "type": "info",
        "tag": "South Africa",
        "return": ["*"],
        "limit": 20,
    };
    request.send(JSON.stringify(requestData));
    request.onload = function(){
        json = JSON.parse(this.responseText);
        populateNews(json);
    }
}

function populateNews(json){
    let articles = document.getElementsByClassName("general-latest-article");

    for(let article of articles){
        let data = json.data[Math.floor(Math.random()*json.data.length)];
        article.querySelector("a").setAttribute("href", data.link);
        article.querySelector(".latest-article-image").src = data.image;
        article.querySelector(".latest-article-title").innerHTML = data.title;
        article.querySelector(".latest-article-description").innerHTML = data.description;

        let author = data.author;
        if(author == ""){
            author = "Unknow Author"
        }
        let date = data.date;
        article.querySelector(".latest-article-author").innerHTML = author + " - " + date.split('T')[0];  

        let tag = article.querySelector(".tag");
        tag.innerHTML = data.tag;
        tag.style.backgroundColor = tagGenerator();
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