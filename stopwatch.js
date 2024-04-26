const touch = document.getElementById("touch");
const timeDis = document.getElementById('time-dis');
const timeIn = document.getElementById('time-in');

var int;
let waitingTime = 300;
let startSpace;
var spaceStat = "up";
var watchStat = "off";
var stopDone = "no";
var startWait = "no";
let startTimeStopwatch;
let time;
var type = "stopwatch";

window.switchType = function switchType(n) {
	type = n;
	timeDis.style.visibility = "hidden";
	timeIn.style.visibility = "hidden";
	if (n == "stopwatch") {
		timeDis.style.visibility = "visible";
	} else if (n == "typing") {
		timeIn.style.visibility = "visible";
	}
}

function startStopwatch() {
	watchStat = "on";
	document.getElementById('scramble-box').style.visibility = "hidden";
	document.getElementById('time-list-box').style.visibility = "hidden";
	document.getElementById('session-box').style.visibility = "hidden";
	document.getElementById('graph-box').style.visibility = "hidden";
	document.getElementById('touch').style.height = "100%";
	document.getElementById('touch').style.width = "100%";
	timeDis.style.color = "white"; 
	startTimeStopwatch = new Date();
	int = setInterval(() => { 
		time = new Date() - startTimeStopwatch;
		timeDis.innerHTML = displayTime(time);
	}, 1);
}

function stopStopwatch() {
	clearInterval(int);
	document.getElementById('scramble-box').style.visibility = "visible";
	document.getElementById('time-list-box').style.visibility = "visible";
	document.getElementById('session-box').style.visibility = "visible";
	document.getElementById('graph-box').style.visibility = "visible";
	document.getElementById('touch').style.height = "calc(70vh - 2px)";
	document.getElementById('touch').style.width = "calc(65vw - 2px)";
	time = new Date() - startTimeStopwatch;
	solves ++;
	var sesTimes = times.find(obj => obj.name === findActive()).times;
	sesTimes.push(time);
	timeDis.innerHTML = displayTime(time);
	timeListBody.innerHTML = "<tr><td class=\"time-list-num-box\" onclick=\"delTime(" + (solves - 1) + ", 1)\" style=\"text-align: center;\"><b class=\"time-list-num\">" + solves + "</b><b class=\"time-list-x\">X</b></td><td>" + displayTime(time) + "</td>" + moOrAo(solves, data1, true) + moOrAo(solves, data2, true) + moOrAo(solves, data3, true) + "</tr>" + timeListBody.innerHTML;
	localStorage.setItem("times", JSON.stringify(times));
	generate();
	updateSesPBs();
	updateGraph();
}

function spaceDown() {
	if (spaceStat == "up" && watchStat == "off" && js == "yes" && type == "stopwatch") { 
		timeDis.style.color = "red"; 
		startSpace = new Date();
		spaceStat = "down";
		setTimeout(() => { 
			if (spaceStat == "down") {
				startWait = "yes";
				timeDis.style.color = "green"; 
			}
		}, waitingTime);
	} else if (watchStat == "on" && stopDone == "no" && js == "yes" && type == "stopwatch"){
		stopDone = "yes";
		stopStopwatch();
	} else if (event.code === "Escape" && startWait == "yes" && js == "yes" && type == "stopwatch") {
		timeDis.style.color = "white";
		startWait = "no";
	}
}

function spaceUp() {
	if ((new Date() - startSpace) < waitingTime && spaceStat == "down" && watchStat == "off" && js == "yes" && type == "stopwatch") {
		timeDis.style.color = "white"; 
		spaceStat = "up";
	} else if ((new Date() - startSpace) >= waitingTime && startWait == "yes" && spaceStat == "down" && watchStat == "off" && js == "yes" && type == "stopwatch") {
		startWait = "no";
		startStopwatch();
		spaceStat = "up";
	} else if (watchStat == "on" && js == "yes" && type == "stopwatch") {
		stopDone = "no";
		watchStat = "off";
	} else {
		spaceStat = "up";
	}
}

touch.addEventListener("keydown", function(event) { 
	if (event.code === "Space" || event.code === "Escape") {
		spaceDown();
	} else if (watchStat == "on" && stopDone == "no" && js == "yes" && type == "stopwatch"){
		stopDone = "yes";
		stopStopwatch();
	}
});

touch.addEventListener("keyup", function(event) { 
	if (event.code === "Space") {
		spaceUp();
	}
});

touch.addEventListener("touchstart", function(event) { 
		spaceDown();
});

touch.addEventListener("touchend", function(event) { 
		spaceUp();
});

timeIn.addEventListener('keydown', function(event) {
	if (event.key === 'Enter' && type == "typing" && timeIn.value >= 1 && js == "yes") {
		time = timeIn.value * 10;
		timeIn.value = "";
		solves ++;
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		sesTimes.push(time);
		timeListBody.innerHTML = "<tr><td class=\"time-list-num-box\" onclick=\"delTime(" + (solves - 1) + ", 1)\" style=\"text-align: center;\"><b class=\"time-list-num\">" + solves + "</b><b class=\"time-list-x\">X</b></td><td>" + displayTime(time) + "</td>" + moOrAo(solves, data1, true) + moOrAo(solves, data2, true) + moOrAo(solves, data3, true) + "</tr>" + timeListBody.innerHTML;
		localStorage.setItem("times", JSON.stringify(times));
		generate();
		updateSesPBs();
		updateGraph();
	}
});

switchType(type);