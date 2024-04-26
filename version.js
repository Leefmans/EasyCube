const updateScreen = document.getElementById("update");
window.js = "no";


if (localStorage.getItem("version")) {
	if (localStorage.getItem("version") != "0.4") {
		updateScreen.style.visibility = "visible";
		localStorage.setItem("version", "0.4");
		document.getElementById("update-ok").focus();
	} else {
		js = "yes";
		updateScreen.style.visibility = "hidden";
	}
} else {
	updateScreen.style.visibility = "visible";
	localStorage.setItem("version", "0.4");
	document.getElementById("update-ok").focus();
}

function go() {
	js = "yes";
	updateScreen.style.visibility = "hidden";
	generate();
}

document.getElementById("update-ok").addEventListener("click", go);