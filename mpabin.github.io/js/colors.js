var length = 65;
var elms = document.getElementsByClassName("rainbow-bg");
var gradient = makeColorGradient(.3,.3,.3,0,2,4,200,55, length);
var index = 0;
function setColorBackgrounds(){
	if(index > length){
		index = 0;
	}
	for(var z = 0; z < elms.length; z++){
		elms[z].style.backgroundColor = gradient[z];
		
		var heading = elms[z].getElementsByClassName("panel-heading")[0];
		if(heading) {
			heading.style.backgroundColor = gradient[z];
		}
	}
	index++;
}

function makeColorGradient(frequency1, frequency2, frequency3,
						 phase1, phase2, phase3,
						 center, width, len)
{
	if (center == undefined)   center = 128;
	if (width == undefined)    width = 127;
	if (len == undefined)      len = 50;
	
	var gradient = [];
	for (var i = 0; i < len; ++i)
	{
	   var red = Math.sin(frequency1*i + phase1) * width + center;
	   var grn = Math.sin(frequency2*i + phase2) * width + center;
	   var blu = Math.sin(frequency3*i + phase3) * width + center;
	   gradient.push(RGB2Color(red,grn,blu));
	}
	return gradient;
}

function RGB2Color(r,g,b)
{
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n)
{
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

//setInterval(cycleThroughColors, 100);
$(document).ready(function() {
	setColorBackgrounds();
});