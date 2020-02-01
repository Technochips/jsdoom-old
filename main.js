var wad;

var shownElements = ["wad-selection", "loading", "game"];

var fps = 35;
var ms = 1000/fps;

var width = 320;
var height = 200;
var cwidth;
var cheight;
var swidth;
var sheight;
var useBuffer = true;
var screenBuffer = [];
var oldBuffer = [];
var ctx;

var tipText = "Loading...";

var playpal = [[]];
for(var i = 0; i < 256; i++) playpal[0][i] = [i, i, i];
var playpalCurrent = 0;
var playpalOld = 1;
var patches = [];
var frame = 0;

function getPalette(i)
{
	return playpal[playpalCurrent][i];
}

function loadFile()
{
	setShown("game");
	var canvas = document.getElementById("jsdoom-canvas");
	cwidth = canvas.width;
	cheight = canvas.height;
	swidth = cwidth/width;
	sheight = cheight/height;
	for(var x = 0; x < width; x++)
	{
		screenBuffer[x] = []
		oldBuffer[x] = []
		for(var y = 0; y < height; y++)
		{
			screenBuffer[x][y] = 0;
			oldBuffer[x][y] = 1;
		}
	}
	if(canvas.getContext)
	{
		ctx = canvas.getContext("2d");
		run();
		console.log("Started loop")
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

function drawPixel(color, x, y)
{
	if(useBuffer)
	{
		screenBuffer[x][y] = color;
	}
	else
	{
		ctx.fillStyle = "rgb(" + getPalette(color)[0] + ", " + getPalette(color)[1] + ", " + getPalette(color)[2] + ")";
		ctx.fillRect(x,y,1,1);
	}
}

function drawText(text, x, y)
{
	var w = 0;
	for(var i = 0; i < text.length; i++)
	{
		var c = text.charAt(i);
		if(hu_font[c.toUpperCase()])
		{
			var p = drawPatch(hu_font[c.toUpperCase()], x+w,y)
			if(p)
			{
				if(w+p.width > width) break;
				w+=p.width;
			}
			else if(!useBuffer)
			{
				if(w+8 > width) break;
				ctx.fillText(c, x+w, y+10);
				w += 8;
			}
		}
		else
		{
			w += 4;
		}
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
					drawPixel(p.img[w][h],x+w-p.xOffset,y+h-p.yOffset)
				}
			}
		}
	}
	return p;
}
function run()
{
	setTimeout(run, ms);
	if(!wipe.gonnaWipe)
	{
		update();
		draw();
	}
	if(wipe.gonnaWipe)
	{
		wipe.wipe();
	}
	applyBuffer();
}
function update()
{
	frame++;
	tipText = String(M_Random());
	if(frame == 175)
	{
		wipe.startWiping();
	}
}
function draw()
{
	drawPatch(frame < 175 ? "TITLEPIC" : "CREDIT", 0, 0);
	drawText(tipText, 0, 0);
}
function applyBuffer()
{
	if(useBuffer)
	{
		for(var x = 0; x < width; x++)
		{
			for(var y = 0; y < height; y++)
			{
				if(playpalCurrent != playpalOld || screenBuffer[x][y] != oldBuffer[x][y])
				{
					ctx.fillStyle = "rgb(" + getPalette(screenBuffer[x][y])[0] + ", " + getPalette(screenBuffer[x][y])[1] + ", " + getPalette(screenBuffer[x][y])[2] + ")";
					ctx.fillRect(x*swidth,y*sheight,swidth,sheight);
				}
			}
		}
		oldBuffer = [];
		for(var x = 0; x < width; x++)
		{
			oldBuffer[x] = screenBuffer[x].slice();
		}
		playpalOld = playpalCurrent;
	}
}

setShown("wad-selection");