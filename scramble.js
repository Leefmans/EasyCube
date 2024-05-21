var cstimer = (function() {
	var worker = new Worker('node_modules/cstimer_module/cstimer_module.js');

	var callbacks = {};
	var msgid = 0;

	worker.onmessage = function(e) {
		var data = e.data; //data: [msgid, type, ret]
		var callback = callbacks[data[0]];
		delete callbacks[data[0]];
		callback && callback(data[2]);
	}

	function callWorkerAsync(type, details) {
		return new Promise(function(type, details, resolve) {
			++msgid;
			callbacks[msgid] = resolve;
			worker.postMessage([msgid, type, details]);
		}.bind(null, type, details));
	}

	return {
		getScrambleTypes: function() {
			return callWorkerAsync('scrtype');
		},
		getScramble: function() {
			return callWorkerAsync('scramble', Array.prototype.slice.apply(arguments));
		},
		setSeed: function(seed) {
			return callWorkerAsync('seed', [seed]);
		},
		setGlobal: function(key, value) {
			return callWorkerAsync('set', [key, value]);
		},
		getImage: function(scramble, type) {
			return callWorkerAsync('image', [scramble, type]);
		}
	}
})();

window.generate = async function generate() {
	if (js == "yes") {
		const scramble = await cstimer.getScramble('333');
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
		document.getElementById('popup-message').innerHTML = "navigator.clipboard is not supported. select and copy this instead:<br>" + document.getElementById('scramble').innerHTML;
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