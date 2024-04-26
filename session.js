const sessionList = document.getElementById("session-list");
const newSesBox = document.getElementById("new-session-box");
const blank = document.getElementById("blank");

window.menu = "closed";
window.solves = 0;
window.sessions = [];
window.times = [];

function sessionDuplicate(sessionName) {
  return sessions.find(session => session.name === sessionName) === undefined;
}

function findActive() {
  return sessions.find(obj => obj.active === 'yes').name;
}

function openSesList() {
	if (js == "yes" && menu == "closed") {
		menu = "open";
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
	menu = "closed";
	sessionList.style.visibility = "hidden";
	blank.style.visibility = "hidden";
	document.getElementById("session-switch").innerHTML = ses;
	sessions.find(obj => obj.active === 'yes').active = "no";
	sessions.find(obj => obj.name === ses).active = "yes";
	localStorage.setItem("sessions", JSON.stringify(sessions));
	activeSes = ses;
	retrieve();
	updateSesPBs();
	updateGraph();
}

function newSes(name) {
	sessions.find(obj => obj.active === 'yes').active = "no";
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
	localStorage.setItem("sessions", JSON.stringify(sessions));
	localStorage.setItem("times", JSON.stringify(times));
	swapSes(name);
	loadSesList(sessions);
}

function openNewSes() {
	if (js == "yes" && menu == "closed") {
		menu = "open";
		newSesBox.style.visibility = "visible";
		blank.style.visibility = "visible";
		document.getElementById("new-session-in").focus();
	}
}

function closeNewSes() {
	if (js == "yes" && menu == "open" && document.getElementById("new-session-in").value != "" && sessionDuplicate(document.getElementById("new-session-in").value)) {
		menu = "closed";
		newSesBox.style.visibility = "hidden";
		blank.style.visibility = "hidden";
		newSes(document.getElementById("new-session-in").value);
		document.getElementById("new-session-in").value = "";
	} else if (js == "yes" && menu == "open" && document.getElementById("new-session-in").value != "") {
		document.getElementById('popup').style.visibility = "visible";
		document.getElementById('popup-yes').style.visibility = "visible";
		document.getElementById('popup-yes').innerHTML = "OK";
		document.getElementById('popup-no').style.visibility = "hidden";
		document.getElementById('popup-message').innerHTML = "This session name is already in use.";
		document.getElementById('popup-yes').addEventListener('click', () => {
			document.getElementById('popup').style.visibility = "hidden";
			document.getElementById('popup-yes').style.visibility = "hidden";
		}, {once: true});
	}
}

function exitNewSes() {
	if (js == "yes" && menu == "open") {
		menu = "closed";
		newSesBox.style.visibility = "hidden";
		blank.style.visibility = "hidden";
		document.getElementById("new-session-in").value = "";
	}
}

if (localStorage.getItem("sessions")) {
	sessions = JSON.parse(localStorage.getItem("sessions"));
	window.activeSes = findActive();
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
document.getElementById("session-new").addEventListener("click", openNewSes);
document.getElementById("new-session-confirm").addEventListener("click", closeNewSes);
document.getElementById("new-session-exit").addEventListener("click", exitNewSes);
