getCovidData();

function getCovidData(){
	const request = new XMLHttpRequest();

    request.open("get", "https://api.covid19api.com/total/dayone/country/south-africa");
	request.onload = () => {
        let json = JSON.parse(request.responseText);
        populateGraph(json);
    };

	request.send();
}

function populateGraph(json){
    const dailyCases = json.map((day, index) => {
        if (index) return Math.abs(day.Confirmed - json[index -1].Confirmed);
        else day.Confirmed;
    });

    const dateFormatter = new Intl.DateTimeFormat("en-SA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const labels = json.map(day => {
        const trunc = day.Date.substring(0,day.Date.indexOf("T"));
        const formattedDate = new Date(trunc);
        return dateFormatter.format(formattedDate);
    });

    var config = {
        type: 'line',
        data:{
            labels: labels,
            datasets: [{
                    label: "Cases",
                    data: dailyCases,
                    fill: true,
                    borderWidth: 1,
                    backgroundColor: [
                        '#2a80eaa2'
                    ],
                    borderColor: [
                        '#185aaa'
                    ],
                    pointBackgroundColor:'#185aaa',
                }]
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
                    radius: 1,
                    hoverRadius: 4,
                },
            },
            title: {
                display: true,
                text: 'Daily Cases For South Africa',
                fontSize:24,
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
            hover:{
                mode: 'nearest',
                animationDuration: 400,
            },
        },
    };

    var ctx = document.getElementById("statsChart").getContext("2d");
    window.myLineChart = new Chart(ctx, config);
}