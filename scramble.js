import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";
import { setSearchDebug } from "https://cdn.cubing.net/js/cubing/search";
setSearchDebug({
	logPerf: false,
	scramblePrefetchLevel: "none"
});

window.generate = async function generate() {
	const scramble = await randomScrambleForEvent("333");
	document.getElementById('scramble').innerHTML = scramble;
}

document.getElementById('refresh-scramble-bt').addEventListener('click', generate);
document.addEventListener("keydown", (event) => { if (event.code === "KeyR") { generate(); }}); 

generate();