var wad;

var shownElements = ["wad-selection", "loading", "game"];

var fps = 35;
var width;
var height;
var ctx;

var loadText = "Loading...";

var playpal = [[]];
for(var i = 0; i < 255; i++) playpal[0][i] = [i, i, i];
var playpalCurrent = 0;

function getPalette(i)
{
	return playpal[playpalCurrent][i];
}

function loadFile()
{
	setShown("game");
	var canvas = document.getElementById("jsdoom-canvas");
	width = canvas.width;
	height = canvas.height;
	if(canvas.getContext)
	{
		ctx = canvas.getContext("2d");
		draw();
		console.log("Started draw loop")
	}
	var reader = new FileReader();
    reader.onload = function(){
		console.log("Loading WAD data...")
		var data = reader.result;
		wad = new WAD(data);
    };
	console.log("Reading file")
    reader.readAsArrayBuffer(document.getElementsByName("iwad")[0].files[0]);
}

function setShown(e, loadMsg)
{
	for(var s in shownElements)
	{
		if(shownElements[s] == "loading")
			document.getElementById("loading-p").textContent = loadMsg;
		if(e == shownElements[s])
			document.getElementById(shownElements[s]).classList.remove('hidden');
		else
			document.getElementById(shownElements[s]).classList.add('hidden');
	}
}

function drawText(text, x, y)
{
	ctx.fillText(text, x, y+10);
}

function draw()
{
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "rgb(" + getPalette(184)[0] + ", " + getPalette(184)[1] + ", " + getPalette(184)[2] + ")";
	drawText(loadText, 0, 0);
	setTimeout(draw, 1000/fps);
}

setShown("wad-selection");