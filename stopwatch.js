const timeDis = document.getElementById('time-dis');
const timeListBody = document.getElementById('time-list-body');

var int;
let startSpace;
var spaceStat = "up";
var watchStat = "off";
var stopDone = "no";
var startWait = "no";
let startTimeStopwatch;
let time;
let min = 0;
let hou = 0;
let solves = 0;
var times = [];

function displayTime(time) {
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

function startStopwatch() {
	watchStat = "on";
	document.getElementById('scramble-box').style.visibility = "hidden";
	timeDis.style.color = "white"; 
	startTimeStopwatch = new Date();
	int = setInterval(() => { 
		time = new Date() - startTimeStopwatch;
		timeDis.innerHTML = displayTime(time);
		document.getElementById('touch').style.top = "0px";
		document.getElementById('touch').style.height = "calc(100vh - 40px)";
	}, 1);
}

function stopStopwatch() {
	clearInterval(int);
	generate();
	document.getElementById('scramble-box').style.visibility = "visible";
	document.getElementById('touch').style.top = "calc(50vh - 100px)";
	document.getElementById('touch').style.height = "calc(50vh + 60px)";
	time = new Date() - startTimeStopwatch;
	solves ++;
	times.push(time);
	timeDis.innerHTML = displayTime(time);
	timeListBody.innerHTML = "<tr><td>" + displayTime(time) + "</td>" + mo3() + "</tr>" + timeListBody.innerHTML;
}

function mo3() {
	if (solves >= 3) {
		return "<td>" + displayTime((times[solves - 1] + times[solves - 2] + times[solves - 3]) / 3) + "</td>";
	} else {
		return "<td style=\"text-align: center\">-</td>";
	}
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
		}, 400);
	} else if (watchStat == "on" && stopDone == "no"){
		stopDone = "yes";
		stopStopwatch();
	} else if (event.code === "Escape" && startWait == "yes") {
		timeDis.style.color = "white";
		startWait = "no";
	}
}

function spaceUp() {
	if (event.code === "Space" && (new Date() - startSpace) < 400 && spaceStat == "down" && watchStat == "off") {
		timeDis.style.color = "white"; 
		spaceStat = "up";
	} else if (event.code === "Space" && (new Date() - startSpace) >= 400 && startWait == "yes" && spaceStat == "down" && watchStat == "off") {
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
	spaceDown();
});

document.addEventListener("keyup", (event) => { 
	spaceUp();
});