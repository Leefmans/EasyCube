window.timeListBody = document.getElementById('time-list-body');

window.retrieve = function retrieve() {
	if (localStorage.getItem("times")) {
		solves = 0;
		times = JSON.parse(localStorage.getItem("times")); 
		timeListBody.innerHTML = "";
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		sesTimes.forEach((data, index) => { 
				solves++;
				timeListBody.innerHTML = "<tr><td style=\"text-align: center;\">" + (index + 1) + "</td><td>" + displayTime(data) + "</td>" + mo3(index + 1) + ao5(index + 1) + ao12(index + 1) + "</tr>" + timeListBody.innerHTML;
		});
	}
}

window.displayTime = function displayTime(time) {
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

window.mo3 = function mo3(num) {
	if (num >= 3) {
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		return "<td>" + displayTime((sesTimes[num - 1] + sesTimes[num - 2] + sesTimes[num - 3]) / 3) + "</td>";
	} else {
		return "<td style=\"text-align: center\">-</td>";
	}
}

window.ao5 = function ao5(num) {
	if (num >= 5) {
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		var sel = [sesTimes[num - 1], sesTimes[num - 2], sesTimes[num - 3], sesTimes[num - 4], sesTimes[num - 5]];
		sel.sort(function(a, b){return a - b});
		return "<td>" + displayTime((sel[1] + sel[2] + sel[3]) / 3) + "</td>";
	} else {
		return "<td style=\"text-align: center\">-</td>";
	}
}

window.ao12 = function ao12(num) {
	if (num >= 12) {
		var sesTimes = times.find(obj => obj.name === activeSes).times;
		var sel = [sesTimes[num - 1], sesTimes[num - 2], sesTimes[num - 3], sesTimes[num - 4], sesTimes[num - 5], sesTimes[num - 6], sesTimes[num - 7], sesTimes[num - 8], sesTimes[num - 9], sesTimes[num - 10], sesTimes[num - 11], sesTimes[num - 12]];
		sel.sort(function(a, b){return a - b});
		return "<td>" + displayTime((sel[1] + sel[2] + sel[3] + sel[4] + sel[5] + sel[6] + sel[7] + sel[8] + sel[9] + sel[10]) / 10) + "</td>";
	} else {
		return "<td style=\"text-align: center\">-</td>";
	}
}

window.delTime = function delTime(index, amount) {
	if (localStorage.getItem("times")) {
		times = JSON.parse("[" + localStorage.getItem("times") + "]"); 
		solves -= amount;
		times.splice(index, amount);
		localStorage.setItem("times", times);
		timeListBody.innerHTML = "";
		times.forEach((data, index) => { 
			timeListBody.innerHTML = "<tr><td style=\"text-align: center;\">" + (index + 1) + "</td><td>" + displayTime(data) + "</td>" + mo3(index + 1) + ao5(index + 1) + ao12(index + 1) + "</tr>" + timeListBody.innerHTML;
		});
	}
}

retrieve();