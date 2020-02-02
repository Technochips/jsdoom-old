var wad;

var shownElements = ["wad-selection", "loading", "game"];

var fps = 35;
var ms = 1000/fps;

var canvas;
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
var ctxData;

var playpal = [[]];
for(var i = 0; i < 256; i++) playpal[0][i] = [i, i, i];
var playpalCurrent = 0;
var playpalOld = 1;
var frame = 0;
var dt_fps = 0;
var dt_ms = 0;

var flashing = false; //DEBUG
var fast = false;

var gamemode = "indetermined";

function getPalette(i)
{
	if(playpal[playpalCurrent])
		return playpal[playpalCurrent][i];
	else
		return playpal[0][i];
}

function loadFile()
{
	setShown("game");
	canvas = document.getElementById("jsdoom-canvas");

	cwidth = canvas.width;
	cheight = canvas.height;
	swidth = cwidth/width;
	sheight = cheight/height;

	for(var x = 0; x < width; x++)
	{
		screenBuffer[x] = [];
		oldBuffer[x] = [];
		for(var y = 0; y < height; y++)
		{
			screenBuffer[x][y] = 0;
			oldBuffer[x][y] = 1;
		}
	}

	if(canvas.getContext)
	{
		ctx = canvas.getContext("2d");
		ctxData = ctx.getImageData(0, 0, cwidth, cheight);
	}

	var reader = new FileReader();
    reader.onload = function()
	{
		console.log("Loading WAD data...");
		var data = reader.result;
		wad = new WAD(data);
		if(wad.getFirstLump("MAP02")) //map01 may be missing
		{
			gamemode = "commercial";
		}
		else if(!wad.getFirstLump("E2M1"))
		{
			gamemode = "shareware";
		}
		else if(!wad.getFirstLump("E4M1"))
		{
			gamemode = "registered";
		}
		else
		{
			gamemode = "retail";
		}
		init();
    }
	console.log("Reading file");
	reader.readAsArrayBuffer(document.getElementsByName("iwad")[0].files[0]);
}

function init()
{
	setTimeout(run, 0, performance.now());
	console.log("Started loop");

	window.addEventListener("keydown", onKeyDown, true);
	
	menu.init();
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

function drawPixel(color, x, y)
{
	if(x >= 0 && x < width && y >= 0 && y < height)
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
}

function drawText(text, x, y)
{
	var w = 0;
	var h = 0;
	for(var i = 0; i < text.length; i++)
	{
		var c = text.charAt(i);
		if(c == "\n")
		{
			w = 0;
			h+=7;
		}
		else if(hu_font[c.toUpperCase()])
		{
			var p = Patch.drawPatch(hu_font[c.toUpperCase()], x+w,y+h)
			if(p)
			{
				if(w+p.width > width) break;
				w+=p.width;
			}
			else if(!useBuffer)
			{
				if(w+8 > width) break;
				ctx.fillText(c, x+w, y+h+10);
				w += 8;
			}
		}
		else
		{
			w += 4;
		}
	}
}

function run(dt)
{
	var dt_now = performance.now();
	dt_ms = dt_now - dt;
	dt_fps = 1/(dt_ms/1000);
	if(!fast) setTimeout(run, ms, [dt_now]);
	if(!wipe.gonnaWipe)
	{
		update();
		draw();
	}
	if(wipe.gonnaWipe)
	{
		wipe.wipe();
	}
	drawText("fps: " + dt_fps.toFixed(2) + "\nms: " + dt_ms.toFixed(2), 0, 186);
	applyBuffer();
	if(fast) setTimeout(run, 0, [dt_now]);
}
function update()
{
	frame++;
	if(flashing)
	{
		if(playpalCurrent > 9) playpalCurrent --; //DEBUG STUFF
		else
		{
			if(frame % fps === 0) playpalCurrent = 12;
			else playpalCurrent = 0;
		}
	}	
	gamestates[gamestate].update();
	menu.update();
}
function draw()
{
	gamestates[gamestate].draw();
	menu.draw();
}
function onKeyDown(e)
{
	if(menu.onKeyDown(e))
		e.preventDefault();
}
function applyBuffer()
{
	if(useBuffer)
	{
		for(var x = 0; x < width; x++)
		{
			for(var y = 0; y < height; y++)
			{
				var c = (x+(y*cwidth))*4;
				if(playpalCurrent != playpalOld || screenBuffer[x][y] != oldBuffer[x][y])
				{
					ctxData.data[c] = getPalette(screenBuffer[x][y])[0];
					ctxData.data[c+1] = getPalette(screenBuffer[x][y])[1];
					ctxData.data[c+2] = getPalette(screenBuffer[x][y])[2];
					ctxData.data[c+3] = 255;
				}
			}
		}
		ctx.putImageData(ctxData, 0, 0);
		oldBuffer = [];
		for(var x = 0; x < width; x++)
		{
			oldBuffer[x] = screenBuffer[x].slice();
		}
		playpalOld = playpalCurrent;
	}
}

setShown("wad-selection");