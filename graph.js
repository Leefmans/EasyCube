var sesTimesDevided = [];
var ses1Devided = [];
var ses2Devided = [];
var ses3Devided = [];

const ctx = document.getElementById('graph').getContext('2d');

function newGraph() {
	sesTimesDevided = [];
	sesTimes.forEach(time => {
		sesTimesDevided.push(Math.floor(time / 10) / 100);
	});
	
	ses1Devided = [null, null];
	ses1.forEach(time => {
		ses1Devided.push(Math.floor(time / 10) / 100);
	});

	ses2Devided = [null, null, null, null];
	ses2.forEach(time => {
		ses2Devided.push(Math.floor(time / 10) / 100);
	});
	
	ses3Devided = [null, null, null, null, null, null, null, null, null, null, null];
	ses3.forEach(time => {
		ses3Devided.push(Math.floor(time / 10) / 100);
	});

	var graph = new Chart(ctx, {
		type: 'line',
		data: {
			labels: Array.from({ length: sesTimes.length}, (_, i) => i + 1),
			datasets: [{
				label: 'AO12',
				data: ses3Devided,
				backgroundColor: 'cyan',
				borderColor: 'cyan',
				borderWidth: 2
			},
			{
				label: 'AO5',
				data: ses2Devided,
				backgroundColor: 'yellow',
				borderColor: 'yellow',
				borderWidth: 2
			},
			{
				label: 'MO3',
				data: ses1Devided,
				backgroundColor: 'red',
				borderColor: 'red',
				borderWidth: 2
			},
			{
				label: 'Single',
				data: sesTimesDevided,
				backgroundColor: 'white',
				borderColor: 'white',
				borderWidth: 2
			}]
		},
		options: {
			animation: false,
			responsive: true,
			maintainAspectRatio: false,
			elements: {
				point: {
					radius: 0
				}
			},
			scales: {
				y: {
					border: {
						display: false
					},
					grid: {
						color: "white"
					},
					ticks: {
						color: "white"
					}
				},
				x: {
					grid: {
						color: "transparent"
					},
					ticks: {
						color: "white"
					}
				}
			},
			plugins: {
				legend: {
					labels: {
						color: 'white'
					}
				}
			}
		}
	});
}

window.updateGraph = function update() {
	Chart.getChart("graph").destroy();
	newGraph();
}

newGraph();