getGlobalData();

function getGlobalData(){
    const request = new XMLHttpRequest();
    
    request.open("GET", "https://worldometers.p.rapidapi.com/api/coronavirus/all/");
    request.setRequestHeader("X-RapidAPI-Host", "worldometers.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        json = JSON.parse(request.responseText);
        populateGlobalData(json);
        populateSouthAfrica(json);
    };

    request.send();
}

function populateSouthAfrica(json){
    let data;
    for(let country of json.data){
        if(country.Country == "SouthAfrica"){
            data = country;
            break;
        }
    }

    console.log(data);

    /*
    let casesContainer = document.querySelector(".cases-today");
    casesContainer.querySelector(".stat-amount").innerHTML = data.confirmed_diff;

    let deathsContainer = document.querySelector(".deaths-today");
    deathsContainer.querySelector(".stat-amount").innerHTML = data.deaths_diff;
    */

    // let ifr = data.fatality_rate;
    // let ifrContainer = document.querySelector(".ifr");
    // ifrContainer.querySelector(".stat-amount").innerHTML = ifr.toPrecision(2) + "%";

    // let cfr = (data.deaths/data.confirmed)*100;
    // let cfrContainer = document.querySelector(".cfr");
    // cfrContainer.querySelector(".stat-amount").innerHTML = cfr.toPrecision(2) + "%";    
}

function populateGlobalData(json){
    let data = json.data[0];
    console.log(json)

    let overallContainer = document.querySelector(".Overall-stats");
    let counters = overallContainer.getElementsByClassName("counter-amount");
    let news = overallContainer.getElementsByClassName("counter-new");

    counters[0].innerHTML =  data["Total Cases"];
    counters[1].innerHTML = data["Total Recovered"];
    counters[2].innerHTML = data["Total Deaths"];

    news[0].innerHTML =  data["New Cases"];
    news[1].innerHTML = data["New Recovered"];
    news[2].innerHTML = data["New Deaths"];

}