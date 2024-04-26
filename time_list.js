window.timeListBody = document.getElementById('time-list-body');

window.sesTimes = [];
window.sesMO3 = [];
window.sesAO5 = [];
window.sesAO12 = [];

let mo = 0;
let ao = 0;
window.data1 = {
	"type": "MO",
	"num": 3
};
window.data2 = {
	"type": "AO",
	"num": 5
};
window.data3 = {
	"type": "AO",
	"num": 12
};

if (localStorage.getItem("data-mo-ao")) {
	var dataMoAo = JSON.parse(localStorage.getItem("data-mo-ao"));
	data1 = dataMoAo[0];
	data2 = dataMoAo[1];
	data3 = dataMoAo[2];
	document.getElementById("data-1").innerHTML = dataMoAo[0].type + dataMoAo[0].num;
	document.getElementById("data-2").innerHTML = dataMoAo[1].type + dataMoAo[1].num;
	document.getElementById("data-3").innerHTML = dataMoAo[2].type + dataMoAo[2].num;
}

window.retrieve = function retrieve() {
	if (localStorage.getItem("times")) {
		solves = 0;
		times = JSON.parse(localStorage.getItem("times")); 
		timeListBody.innerHTML = "";
		sesTimes = times.find(obj => obj.name === activeSes).times;
		sesTimes.forEach((data, index) => { 
			solves++;
			timeListBody.innerHTML = "<tr><td class=\"time-list-num-box\" onclick=\"delTime(" + (solves - 1) + ", 1)\" style=\"text-align: center;\"><b class=\"time-list-num\">" + (index + 1) + "</b><b class=\"time-list-x\">X</b></td><td>" + displayTime(data) + "</td>" + moOrAo(index + 1, data1, true) + moOrAo(index + 1, data2, true) + moOrAo(index + 1, data3, true) + "</tr>" + timeListBody.innerHTML;
		});
	}
}

window.displayTime = function displayTime(time) {
	const hours = Math.floor(time / 3600000);
	const minutes = Math.floor((time % 3600000) / 60000);
	const seconds = Math.floor((time % 60000) / 1000);
	const milliseconds = Math.floor((time % 1000) / 10);
	
	if (hours < 1) {
		if (minutes < 1) {
			return `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
		} else {
			return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
		}
	} else {
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }
}

window.updateSesPBs = function updateSesPBs() {
	ses1 = [];
	ses2 = [];
	ses3 = [];
	var timesCopy = JSON.parse(JSON.stringify(times));
	var sesSingle = timesCopy.find(obj => obj.name === findActive()).times;
	sesSingle.forEach((data, index) => { 
		if (index >= 2) {
			ses1.push(moOrAo(index + 1, data1, false));
			if (index >= 4) {
				ses2.push(moOrAo(index + 1, data2, false));
				if (index >= 11) {
					ses3.push(moOrAo(index + 1, data3, false));
				}
			}
		}
	});	
	if (sesSingle.length >= 1) {
		var sesSingle = sesSingle.sort(function(a, b){return a - b});
		document.getElementById("pb-single").innerHTML = displayTime(sesSingle[0]);
		if (ses1.length >= 1) {
			var ses1Copy = JSON.parse(JSON.stringify(ses1));
			ses1Copy.sort(function(a, b){return a - b});
			document.getElementById("pb-1").innerHTML = displayTime(ses1Copy[0]);
			if (ses2.length >= 1) {
				var ses2Copy = JSON.parse(JSON.stringify(ses2));
				ses2Copy.sort(function(a, b){return a - b});
				document.getElementById("pb-2").innerHTML = displayTime(ses2Copy[0]);
				if (ses3.length >= 1) {
					var ses3Copy = JSON.parse(JSON.stringify(ses3));
					ses3Copy.sort(function(a, b){return a - b});
					document.getElementById("pb-3").innerHTML = displayTime(ses3Copy[0]);
				} else {
					document.getElementById("pb-3").innerHTML = "-";
				}
			} else {
				document.getElementById("pb-2").innerHTML = "-";
				document.getElementById("pb-3").innerHTML = "-";
			}
		} else {
			document.getElementById("pb-1").innerHTML = "-";
			document.getElementById("pb-2").innerHTML = "-";
			document.getElementById("pb-3").innerHTML = "-";
		}
	} else {
		document.getElementById("pb-single").innerHTML = "-";
		document.getElementById("pb-1").innerHTML = "-";
		document.getElementById("pb-2").innerHTML = "-";
		document.getElementById("pb-3").innerHTML = "-";
	}
}

window.moOrAo = function moOrAo(num, data, el) {
	if (data.type == "MO") {
		return mean(num, data.num, el);
	} else {
		return average(num, data.num, el);
	}
}

window.mean = function mean(num, a, el) {
	if (num >= a) {
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		mo = 0;
		for (let i = 0; i < a; i++) {
			mo += sesTimes[num - i - 1];
		}
		if (el == true) {
			return "<td>" + displayTime(mo / a) + "</td>";
		} else {
			return mo / a;
		}
	} else {
		return "<td style=\"text-align: center\">-</td>";
	}
}

window.average = function average(num, a, el) {
	if (num >= a) {
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		var sel = [];
		ao = 0;
		for (let i = 0; i < a; i++) {
			sel.push(sesTimes[num - i - 1]);
		}
		sel.sort(function(a, b){return a - b});
		for (let i = 0; i < a - 2; i++) {
			ao += sel[a - 2 - i];
		};
		if (el == true) {
			return "<td>" + displayTime(ao / (a - 2)) + "</td>";
		} else {
			return ao / (a - 2);
		}
	} else {
		return "<td style=\"text-align: center\">-</td>";
	}
}

window.delTime = function delTime(index, amount) {
	times = JSON.parse(localStorage.getItem("times")); 
	solves -= amount;
	var act = sessions.find(obj => obj.active === 'yes').name;
	times.find(obj => obj.name === act).times.splice(index, amount);
	localStorage.setItem("times", JSON.stringify(times));
	timeListBody.innerHTML = "";
	times.find(obj => obj.name === act).times.forEach((data, index) => { 
		timeListBody.innerHTML = "<tr><td class=\"time-list-num-box\" onclick=\"delTime(" + (index) + ", 1)\" style=\"text-align: center;\"><b class=\"time-list-num\">" + (index + 1) + "</b><b class=\"time-list-x\">X</b></td><td>" + displayTime(data) + "</td>" + moOrAo(solves, data1, true) + moOrAo(solves, data2, true) + moOrAo(solves, data3, true) + "</tr>" + timeListBody.innerHTML;
	});
	sesTimes = times.find(obj => obj.name === act).times;
	updateSesPBs();
	updateGraph();
}

window.delAll = function delAll() {
	times = JSON.parse(localStorage.getItem("times")); 
	solves = 0;
	var act = sessions.find(obj => obj.active === 'yes').name;
	times.find(obj => obj.name === act).times = [];
	localStorage.setItem("times", JSON.stringify(times));
	timeListBody.innerHTML = "";
	sesTimes = times.find(obj => obj.name === act).times;
	updateSesPBs();
	updateGraph();
}

document.getElementById("time-list-del-all").addEventListener("click", delAll);

retrieve();
updateSesPBs();