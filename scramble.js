import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";
import { setSearchDebug } from "https://cdn.cubing.net/js/cubing/search";
setSearchDebug({
	logPerf: false,
	scramblePrefetchLevel: "none"
});

window.generate = async function generate() {
	if (js == "yes") {
		const scramble = await randomScrambleForEvent("333");
		document.getElementById('scramble').innerHTML = scramble;
	}
}

function copy() {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(document.getElementById("scramble").innerHTML);
	} else {
		document.getElementById("blank").style.visibility = "visible";
		document.getElementById('popup').style.visibility = "visible";
		document.getElementById('popup-yes').style.visibility = "visible";
		document.getElementById('popup-yes').innerHTML = "OK";
		document.getElementById('popup-no').style.visibility = "hidden";
		document.getElementById('popup-message').innerHTML = "navigator.clipboard API is not supported. select and copy this instead:<br>" + document.getElementById('scramble').innerHTML;
		document.getElementById('popup-yes').addEventListener('click', () => {
			document.getElementById('popup').style.visibility = "hidden";
			document.getElementById('popup-yes').style.visibility = "hidden";
			document.getElementById("blank").style.visibility = "hidden";
		}, {once: true});
	}
}

document.getElementById('copy-scramble-bt').addEventListener('click', copy);

document.getElementById('refresh-scramble-bt').addEventListener('click', generate);
document.addEventListener("keydown", (event) => { if (event.code === "KeyR") { generate(); }}); 

generate();