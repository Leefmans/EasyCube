const timeDis = document.getElementById('time-dis');

var int;
let waitingTime = 300;
let startSpace;
var spaceStat = "up";
var watchStat = "off";
var stopDone = "no";
var startWait = "no";
let startTimeStopwatch;
let time;

function startStopwatch() {
	watchStat = "on";
	document.getElementById('scramble-box').style.visibility = "hidden";
	document.getElementById('time-list-box').style.visibility = "hidden";
	timeDis.style.color = "white"; 
	startTimeStopwatch = new Date();
	int = setInterval(() => { 
		time = new Date() - startTimeStopwatch;
		timeDis.innerHTML = displayTime(time);
		document.getElementById('touch').style.top = "0px";
		document.getElementById('touch').style.height = "calc(100vh - 40px)";
		document.getElementById('touch').style.width = "calc(100vw - 40px)";
	}, 1);
}

function stopStopwatch() {
	clearInterval(int);
	generate();
	document.getElementById('scramble-box').style.visibility = "visible";
	document.getElementById('time-list-box').style.visibility = "visible";
	document.getElementById('touch').style.top = "calc(50vh - 100px)";
	document.getElementById('touch').style.height = "calc(50vh + 60px)";
	document.getElementById('touch').style.width = "calc(100vw - 390px)";
	time = new Date() - startTimeStopwatch;
	solves ++;
	var sesTimes = times.find(obj => obj.name === activeSes).times;
	sesTimes.push(time);
	timeDis.innerHTML = displayTime(time);
	timeListBody.innerHTML = "<tr><td style=\"text-align: center;\">" + solves + "</td><td>" + displayTime(time) + "</td>" + mo3(solves) +ao5(solves) + ao12(solves) + "</tr>" + timeListBody.innerHTML;
	localStorage.setItem("times", JSON.stringify(times));
}

function spaceDown() {
	if (event.code === "Space" && spaceStat == "up" && watchStat == "off") { 
		timeDis.style.color = "red"; 
		startSpace = new Date();
		spaceStat = "down";
		setTimeout(() => { 
			if (spaceStat == "down") {
				startWait = "yes";
				timeDis.style.color = "green"; 
			}
		}, waitingTime);
	} else if (watchStat == "on" && stopDone == "no"){
		stopDone = "yes";
		stopStopwatch();
	} else if (event.code === "Escape" && startWait == "yes") {
		timeDis.style.color = "white";
		startWait = "no";
	}
}

function spaceUp() {
	if (event.code === "Space" && (new Date() - startSpace) < waitingTime && spaceStat == "down" && watchStat == "off") {
		timeDis.style.color = "white"; 
		spaceStat = "up";
	} else if (event.code === "Space" && (new Date() - startSpace) >= waitingTime && startWait == "yes" && spaceStat == "down" && watchStat == "off") {
		startWait = "no";
		startStopwatch();
		spaceStat = "up";
	} else if (watchStat == "on") {
		stopDone = "no";
		watchStat = "off";
	} else {
		spaceStat = "up";
	}
}

document.addEventListener("keydown", (event) => { 
	if (js == "yes") {
		spaceDown();
	}
});

document.addEventListener("keyup", (event) => { 
	if (js == "yes") {
		spaceUp();
	}
});