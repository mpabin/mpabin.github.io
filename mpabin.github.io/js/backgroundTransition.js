function getElementBG(elm) {
	var bg	= getComputedStyle(elm).backgroundColor;
		bg	= bg.match(/\((.*)\)/)[1];
		bg	= bg.split(",");
	for (var i = 0; i < bg.length; i++) {
		bg[i] = parseInt(bg[i], 10);
	}
	return bg;
}

function generateRGB() {
	var color = [];
	for (var i = 0; i < 3; i++) {
		var num = Math.floor(Math.random()*225);
		while (num < 25) {
			num = Math.floor(Math.random()*225);
		}
		color.push(num);
	}
	return color;
}

function rgb2hex(color) {
	var hex = [];
	for (var i = 0; i < 3; i++) {
		hex.push(color[i].toString(16));
		if (hex[i].length < 2) { hex[i] = "0" + hex[i]; }
	}
	return "#" + hex[0] + hex[1] + hex[2];
}

function calculateDistance(current, next) {
	var distance = [];
	for (var i = 0; i < 3; i++) {
		distance.push(Math.abs(current[i] - next[i]));
	}
	return distance;
}

var incrementStops = 50;
function calculateIncrement(distance) {
	var increment = [];
	for (var i = 0; i < 3; i++) {
		increment.push(Math.abs(Math.floor(distance[i] / incrementStops)));
		if (increment[i] == 0) {
			increment[i]++;
		}
	}
	return increment;
}

var iteration = Math.round(1000 / (incrementStops/2));
function createTransition(className) {
	var elms			= document.getElementsByClassName(className);
	var elm				= elms[0];
	var currentColor	= getElementBG(elm);
	var randomColor		= generateRGB();
	var distance		= calculateDistance(currentColor, randomColor);
	var increment		= calculateIncrement(distance);
	
	function transition() {
		
		if (currentColor[0] > randomColor[0]) {
			currentColor[0] -= increment[0];
			if (currentColor[0] <= randomColor[0]) {
				increment[0] = 0;
			}
		} else {
			currentColor[0] += increment[0];
			if (currentColor[0] >= randomColor[0]) {
				increment[0] = 0;
			}
		}
		
		if (currentColor[1] > randomColor[1]) {
			currentColor[1] -= increment[1];
			if (currentColor[1] <= randomColor[1]) {
				increment[1] = 0;
			}
		} else {
			currentColor[1] += increment[1];
			if (currentColor[1] >= randomColor[1]) {
				increment[1] = 0;
			}
		}
		
		if (currentColor[2] > randomColor[2]) {
			currentColor[2] -= increment[2];
			if (currentColor[2] <= randomColor[2]) {
				increment[2] = 0;
			}
		} else {
			currentColor[2] += increment[2];
			if (currentColor[2] >= randomColor[2]) {
				increment[2] = 0;
			}
		}
		for(var z = 0; z < elms.length; z++){
			elms[z].style.background = rgb2hex(currentColor);
		}
		
		if (increment[0] == 0 && increment[1] == 0 && increment[2] == 0) {
			clearInterval(handler);
			createTransition(className);
		}
	}
	var handler = setInterval(transition, iteration);
}