getDataRequest();

function getDataRequest(){
  	const data = null;

	const request = new XMLHttpRequest();

	request.open("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=South%20Africa");
	request.setRequestHeader("X-RapidAPI-Host", "covid-19-coronavirus-statistics.p.rapidapi.com");
	request.setRequestHeader("X-RapidAPI-Key", "d6c9483578msh8c34a069db0ddacp158131jsn2cb6e7ce986a");
	request.onload = () => {
        let json = JSON.parse(request.responseText);
		let object = json.data.covid19Stats[0];
		let data = new Array(2);
		data[0] = object.confirmed;
		data[1] = data[0] - object.deaths;
		makeChart(data);
    };

	request.send();
}

function makeChart(data) {
	var canvas = document.getElementById("doughnut");
	var tooltipCanvas = document.getElementById("tooltip-canvas");

	var blue = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
	blue.addColorStop(0, '#2a81ea');
	blue.addColorStop(1, '#185aaa');

	var green = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
	green.addColorStop(0, '#19792e');
	green.addColorStop(1, '#2eaa49');

	window.arcSpacing = 0.15;
	window.segmentHovered = false;

	function textInCenter(value, label) {
		var ctx = tooltipCanvas.getContext('2d');
		ctx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height)
		ctx.restore();
			
		ctx.fillStyle = '#333333';
		ctx.font = '30px sans-serif';
		ctx.textBaseline = 'middle';

		var textPosition = {
			x: Math.round((tooltipCanvas.width - ctx.measureText(value).width) / 2),
			y: tooltipCanvas.height / 1.8,
		};

		ctx.fillText(value, textPosition.x, textPosition.y);
		ctx.fillStyle = '#AAAAAA';
		ctx.font = '14px sans-serif';

		var labelTextPosition = {
			x: Math.round((tooltipCanvas.width - ctx.measureText(label).width) / 2),
			y: tooltipCanvas.height / 2,
		};

		ctx.fillText(label, labelTextPosition.x, labelTextPosition.y - 20);
		ctx.save();
	}

	Chart.elements.Arc.prototype.draw = function() {
		var ctx = this._chart.ctx;
		var vm = this._view;
		var sA = vm.startAngle;
		var eA = vm.endAngle;

		ctx.beginPath();
		ctx.arc(vm.x, vm.y, vm.outerRadius, sA + window.arcSpacing, eA - window.arcSpacing);
		ctx.strokeStyle = vm.backgroundColor;
		ctx.lineWidth = vm.borderWidth;
		ctx.lineCap = 'round';
		ctx.stroke();
		ctx.closePath();
	};

	var config = {
		type: 'doughnut',
		data: {
			labels: [
				'Cases',
				'Recoveries'
			],
			datasets: [{
				data: data,
				backgroundColor: [
					blue,
					green
				],
			}]
		},
		options: {
			cutoutPercentage: 80,
			elements: {
				arc: {
				borderWidth: 18,
				},
			},
			legend: {
				display: false,
			},
			animation: {
				onComplete: function(animation) {
					if (!window.segmentHovered) {
						var value = this.config.data.datasets[0].data[0];
						var label = 'T O T A L';

						textInCenter(value, label);
					}
				},
			},
			tooltips: {
				enabled: false,
				custom: function(tooltip) {
					if (tooltip.body) {
						var line = tooltip.body[0].lines[0],
						parts = line.split(': ');
						textInCenter(parts[1], parts[0].split('').join(' ').toUpperCase());
						window.segmentHovered = true;
					} else {
						window.segmentHovered = false;
					}
				},
			},
		},
	};

	window.chart = new Chart(canvas, config);

}