getCovidData();

function getCovidData(){
	// selecting loading div
    //const loader = document.querySelector("#loading-background");

    //loader.classList.remove("display");
    //loader.style.display = "none";

    // setTimeout(() => {
    //     loader.classList.remove("display");
    // }, 3000);

    // setTimeout(() => {
    //     loader.style.display = "none";
    // }, 4000);


	const request1 = new XMLHttpRequest();
    const request2 = new XMLHttpRequest();

    request1.open("GET", "https://covid-19-statistics.p.rapidapi.com/reports?iso=ZAF");
    request1.setRequestHeader("X-RapidAPI-Host", "covid-19-statistics.p.rapidapi.com");
    request1.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
	request1.onload = () => {
        let json = JSON.parse(request1.responseText);
		populateSAData(json);
    };

    
    request2.open("GET", "https://covid-19-statistics.p.rapidapi.com/reports/total");
    request2.setRequestHeader("X-RapidAPI-Host", "covid-19-statistics.p.rapidapi.com");
    request2.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
    request2.onload = () => {
        let json = JSON.parse(request2.responseText);
        populateWorldData(json);
    };

	request1.send();
    request2.send();
}

function populateSAData(json){
    let data = json.data[0];

    let casesContainer = document.querySelector(".cases-today");
    casesContainer.querySelector(".stat-amount").innerHTML = data.confirmed_diff;

    let deathsContainer = document.querySelector(".deaths-today");
    deathsContainer.querySelector(".stat-amount").innerHTML = data.deaths_diff;

    let ifr = data.fatality_rate;
    let ifrContainer = document.querySelector(".ifr");
    ifrContainer.querySelector(".stat-amount").innerHTML = ifr.toPrecision(2) + "%";

    let cfr = (data.deaths/data.confirmed)*100;
    let cfrContainer = document.querySelector(".cfr");
    cfrContainer.querySelector(".stat-amount").innerHTML = cfr.toPrecision(2) + "%";    
}

function populateWorldData(json){
    let data = json.data;

    let overallContainer = document.querySelector(".Overall-stats");
    let counters = overallContainer.getElementsByClassName("counter-amount");

    counters[0].innerHTML =  data.confirmed.toLocaleString();
    counters[1].innerHTML = (data.confirmed- 73029015).toLocaleString();
    counters[2].innerHTML = data.deaths.toLocaleString();
}