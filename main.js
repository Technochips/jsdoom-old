var wad;

var shownElements = ["wad-selection", "loading", "game"];

var fps = 35;
var ms = 1000/fps;

var gametic = 0;
var dt_fps = 0;
var dt_ms = 0;

var fast = false;
var showFps = true;

var quitting = false;

var gamemode = "indetermined";

function loadFile()
{
	setShown("game");
	var canvas = document.getElementById("jsdoom-canvas");

	graphics.init(canvas);

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
	window.addEventListener("keyup", onKeyUp, true);
	
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

function run(dt)
{
	var dt_now = performance.now();
	dt_ms = dt_now - dt;
	dt_fps = 1/(dt_ms/1000);
	if(!wipe.gonnaWipe && !quitting)
	{
		update();
		draw();
	}
	if(wipe.gonnaWipe)
	{
		wipe.wipe();
	}
	if(showFps) font.drawText("fps: " + dt_fps.toFixed(2) + "\nms: " + dt_ms.toFixed(2), 0, 186);
	graphics.applyBuffer();
	var dt_later = performance.now();
	setTimeout(run, fast ? 0 : ms - (dt_later-dt_now), [dt_now]);
}
function update()
{
	gametic++;
	graphics.update();
	demo.update();
	gamestates[gamestate].update();
	menu.update();
	
	input.removeKeysDown();
}
function draw()
{
	gamestates[gamestate].draw();
	menu.draw();
}
function onKeyDown(e)
{
	input.onKeyDown(e);
	e.preventDefault();
}
function onKeyUp(e)
{
	input.onKeyUp(e);
	e.preventDefault();
}

function quit()
{
	document.location.reload();
}