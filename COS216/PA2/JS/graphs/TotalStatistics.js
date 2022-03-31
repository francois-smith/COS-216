getCovidData();

function getCovidData(){
	const request = new XMLHttpRequest();

    request.open("GET", "https://disease.sh/v3/covid-19/historical/all?lastdays=all");
	request.onload = () => {
        let json = JSON.parse(request.responseText);
        populateGraph(json);
    };

	request.send();
}

function populateGraph(json){
    const casesMap = new Map(Object.entries(json.cases));
    const recoveredMap = new Map(Object.entries(json.recovered));
    const deathsMap = new Map(Object.entries(json.deaths));

    console.log(casesMap);
    console.log(recoveredMap);
    console.log(deathsMap);
    
    let labels = [...casesMap.keys()];

    console.log(labels.length);

    const casesArr = [...casesMap.values()];
    const recoveriesArr = [...recoveredMap.values()];
    const deathsArr = [...deathsMap.values()];

    var canvas = document.getElementById("statsChart");
    var blue = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
	blue.addColorStop(0, '#2a81ea');
	blue.addColorStop(1, '#185aaa');

	var green = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
	green.addColorStop(0, '#19792e');
	green.addColorStop(1, '#2eaa49');

    var red = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
	red.addColorStop(0, '#ff5f5f');
	red.addColorStop(1, '#a82b2b');

    var config = {
        type: 'line',
        data:{
            labels: labels,
            datasets: [
                {
                    label: "Recoveries",
                    fill: false,
                    backgroundColor: green,
                    borderColor: green,
                    data: recoveriesArr
                },
                {
                    label: "Cases",
                    fill: false,
                    backgroundColor: blue,
                    borderColor: blue,
                    data: casesArr
                },
                {
                    label: "Deaths",
                    fill: false,
                    backgroundColor: red,
                    borderColor: red,
                    data: deathsArr
                },
                
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }   
                }]
            },
            elements: {
                point:{
                    radius: 0
                },
            },
            title: {
                display: true,
                text: 'Total Statistics',
                font: {
                    size: 30,
                }
            },
            interaction: {
                mode: 'index',
                intersect: true
            },
            legend: {
                position: 'bottom'
            },
            maintainAspectRatio: false,
            responsive: true,
        },
    };

    var ctx = document.getElementById("statsChart").getContext("2d");
    window.myLineChart = new Chart(ctx, config);
}