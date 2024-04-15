const sessionList = document.getElementById("session-list");
const blank = document.getElementById("blank");

window.solves = 0;
window.sessions = [];
window.times = [];

function findActive(arr) {
  return arr.find(obj => obj.active === 'yes').name;
}

function openSesList() {
	if (js == "yes") {
		sessionList.style.visibility = "visible";
		blank.style.visibility = "visible";
	}
}

function loadSesList(arr) {
	sessionList.innerHTML = "";
	arr.forEach(ses => {
		sessionList.innerHTML = sessionList.innerHTML + "<button class=\"session-list-item\">" + ses.name + "</button>";
	});
	const elements = document.querySelectorAll('.session-list-item');

	elements.forEach((element) => {
		element.addEventListener('click', () => {
			swapSes(element.innerHTML);
		});
	});
}

function swapSes(ses) {
	sessionList.style.visibility = "hidden";
	blank.style.visibility = "hidden";
	document.getElementById("session-switch").innerHTML = ses;
	sessions.find(obj => obj.active === 'yes').name.active = "no";
	sessions.find(obj => obj.name === ses).name.active = "yes";
	localStorage.setItem("sessions", JSON.stringify(sessions));
	activeSes = ses;
	retrieve();
}

function newSes(name) {
	sessions.find(obj => obj.active === 'yes').name.active = "no";
	var newSession = {
		"name": name,
		"scramble": 333,
		"active": "yes"
	};
	var newTimes = {
		"name": name,
		"times": []
	};
	times.push(newTimes);
	sessions.push(newSession);
	loadSesList(sessions);
	localStorage.setItem("sessions", JSON.stringify(sessions));
	localStorage.setItem("times", JSON.stringify(times));
}

if (localStorage.getItem("sessions")) {
	sessions = JSON.parse(localStorage.getItem("sessions"));
	window.activeSes = findActive(sessions);
	document.getElementById("session-switch").innerHTML = activeSes;
	loadSesList(sessions);
} else {
	var newSession = {
		"name": "New Session",
		"scramble": 333,
		"active": "yes"
	};
	var newTimes = {
		"name": "New Session",
		"times": []
	};
	times.push(newTimes);
	sessions.push(newSession);
	document.getElementById("session-switch").innerHTML = "New Session";
	loadSesList(sessions);
	localStorage.setItem("sessions", JSON.stringify(sessions));
	localStorage.setItem("times", JSON.stringify(times));
	window.activeSes = "New Session";
}

document.getElementById("session-switch").addEventListener("click", openSesList);