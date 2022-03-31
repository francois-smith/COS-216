getWeather();

GET https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations%3A(%22South%20Africa%22)&api-key=VUbv6VyQWcs3gVCvfI4abphAi5OkDhAt

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
    console.log(json);
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