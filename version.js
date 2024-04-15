const updateScreen = document.getElementById("update");
window.js = "no";


if (localStorage.getItem("version")) {
	if (localStorage.getItem("version") != "0.2") {
		updateScreen.style.visibility = "visible";
		localStorage.setItem("version", "0.2");
		document.getElementById("update-ok").focus();
	} else {
		go();
	}
} else {
	updateScreen.style.visibility = "visible";
	localStorage.setItem("version", "0.2");
	document.getElementById("update-ok").focus();
}

function go() {
	js = "yes";
	updateScreen.style.visibility = "hidden";
}

document.getElementById("update-ok").addEventListener("click", go);