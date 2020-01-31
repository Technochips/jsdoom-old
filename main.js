var wad;

var shownElements = ["wad-selection", "loading", "game"];

var fps = 35;
var width;
var height;
var ctx;

var loadText = "Loading...";

var playpal = [[]];
for(var i = 0; i < 256; i++) playpal[0][i] = [i, i, i];
var playpalCurrent = 0;
var patches = [];

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

function precachePatch(lump)
{
	if(!patches[lump] && wad)
	{
		var l = wad.getFirstLump(lump);
		if(l) patches[lump] = new Patch(l);
	}
	return patches[lump];
}

function drawText(text, x, y)
{
	for(var i = 0; i < text.length; i++)
	{
		var c = text.charAt(i);
		if(hu_font[c.toUpperCase()]) ctx.fillText(c, x+(i*8), y+10);
	}
}

function drawPatch(patch, x, y)
{
	var p = precachePatch(patch);
	if(p)
	{
		for(var w = 0; w < p.width; w++)
		{
			for(var h = 0; h < p.height; h++)
			{
				if(p.img[w][h] >= 0)
				{
					ctx.fillStyle = "rgb(" + getPalette(p.img[w][h])[0] + ", " + getPalette(p.img[w][h])[1] + ", " + getPalette(p.img[w][h])[2] + ")";
					ctx.fillRect(x+w-p.xOffset,y+h-p.yOffset, 1, 1)
				}
			}
		}
	}
}

function draw()
{
	ctx.clearRect(0, 0, width, height);
	//drawPatch("TITLEPIC", 0, 0);
	ctx.fillStyle = "rgb(" + getPalette(184)[0] + ", " + getPalette(184)[1] + ", " + getPalette(184)[2] + ")";
	drawText(loadText, 0, 0);
	setTimeout(draw, 1000/fps);
}

setShown("wad-selection");