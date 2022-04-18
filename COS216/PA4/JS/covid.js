getGlobalData();
getArticles();
setupPage();

function setupPage() {
    let head = document.getElementsByTagName('head')[0]; 

    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/u21649988/COS216/PA4/CSS/Covid.css'; 

    head.appendChild(stylesheet); 

    let links = document.getElementById('link-container'); 
    let link = links.querySelectorAll('a')[3];

    link.setAttribute('id', 'active-link');
}

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

function getArticles(){
    const request = new XMLHttpRequest();
    
    request.open("GET", "https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&media=True");
    request.setRequestHeader("X-RapidAPI-Host", "covid-19-news.p.rapidapi.com");
    request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request.onload = () => {
        let json = JSON.parse(request.responseText);
        scrollText(json.articles);
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

    let casesContainer = document.querySelector(".cases-today");
    casesContainer.querySelector(".stat-amount").innerHTML = data["New Cases"];

    let deathsContainer = document.querySelector(".deaths-today");
    deathsContainer.querySelector(".stat-amount").innerHTML = data["New Deaths"];

    let mortality = (data["Total Deaths"].replaceAll(',', '')/data.Population.replaceAll(',', ''))*100;
    let mortalityContainer = document.querySelector(".mortality");
    mortalityContainer.querySelector(".stat-amount").innerHTML = mortality.toPrecision(2) + "%";

    let ratio = calculateRatio(data);
    let ratioContainer = document.querySelector(".CRD");
    ratioContainer.querySelector(".stat-amount").innerHTML = ratio;    
}

function calculateRatio(data) {
    let cases = data["Total Cases"].replaceAll(',', '');
    let recoveries = data["Total Recovered"].replaceAll(',', '');
    let deaths = data["Total Deaths"].replaceAll(',', '');

    let total = parseInt(cases) + parseInt(recoveries) + parseInt(deaths);

    return (cases/total).toFixed(2)*100 + ":" + (recoveries/total).toFixed(2)*100 + ":" + (deaths/total).toFixed(2)*100;
}

function populateGlobalData(json){
    let data = json.data[0];

    let criticalContainer = document.querySelector(".critical-cases");
    criticalContainer.getElementsByClassName("counter-amount")[0].innerHTML = data.Critical;

    let overallContainer = document.querySelector(".Overall-stats");
    let counters = overallContainer.getElementsByClassName("counter-amount");
    let news = overallContainer.getElementsByClassName("counter-new");

    counters[0].innerHTML =  data["Total Cases"];
    counters[1].innerHTML = data["Total Recovered"];
    counters[2].innerHTML = data["Total Deaths"];

    news[0].innerHTML =  data["New Cases"];
    news[1].innerHTML = data["New Recovered"];
    news[2].innerHTML = data["New Deaths"];

    calculateCFR(data);
    calculateIFR(data);
}

function calculateCFR(data){
    let cfr = (data["Total Deaths"].replaceAll(',', '')/(data["Total Cases"].replaceAll(',', '')))*100;
    document.getElementsByClassName("cfr-amount")[0].innerHTML = cfr.toFixed(2) + "%";
}

function calculateIFR(data){
    let ifr = (data["Total Deaths"].replaceAll(',', '')/(data["Total Cases"].replaceAll(',', '')*8.71))*100;
    document.getElementsByClassName("ifr-amount")[0].innerHTML = ifr.toFixed(2) + "%";
}

function scrollText(articles){
    let spacing = 200;
    let items = [];
    for (let i = 0; i < 8; i++){
        items.push(articles[i].title + ".");
    }
    
    let textContainer = document.querySelector(".scroll-text");
    let width = window.innerWidth;

    let widths = []
    let percentage = 0;
    for(let item of items){
        let newItem = document.createElement("span");
        newItem.innerHTML = item;
        newItem.style.left = percentage + "px";
        newItem.style.whiteSpace = "nowrap";
        textContainer.appendChild(newItem);
        percentage += newItem.clientWidth + spacing;
        widths.push(newItem.clientWidth + spacing);
    }   

    let position = 0;
    setInterval(() => {
        for(let span of textContainer.querySelectorAll("span")){ 
            position = parseInt(span.style.left.replace("px", ""));
            position = position - 2;
            if(position < -1 * widths[0]){
                position = getPosition(widths);
                val = widths[0];
                widths.splice(0, 1);
                widths.push(val);    
            }
            span.style.left = position + "px";
        }

    }, 15)
}

function getPosition(widths){
    let pos = 0;
    for(var i=1; i < 8; i++){
        pos += widths[i];
    }
    return pos;
}