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
	navigator.clipboard.writeText(document.getElementById("scramble").innerHTML);
}

document.getElementById('copy-scramble-bt').addEventListener('click', copy);

document.getElementById('refresh-scramble-bt').addEventListener('click', generate);
document.addEventListener("keydown", (event) => { if (event.code === "KeyR") { generate(); }}); 

generate();