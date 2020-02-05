var wipe = {};

wipe.gonnaWipe = false;
wipe.wiping = false;
wipe.startScreen;
wipe.endScreen;
wipe.columns = [];
wipe.wipes = true;

wipe.startWiping = function()
{
	wipe.gonnaWipe = true;
	wipe.columns = [];
	wipe.startScreen = [];
	wipe.endScreen = [];
}
wipe.end = function()
{
	wipe.gonnaWipe = false;
	wipe.wiping = false;
	wipe.columns = [];
	wipe.startScreen = [];
	wipe.endScreen = [];
}
wipe.wipe = function()
{
	if(!wipe.wipes || !drawing)
	{
		wipe.end();
		return;
	}
	var w = graphics.width/2;
	if(!wipe.wiping)
	{
		wipe.wiping = true;
		for(var x = 0; x < graphics.width; x++)
		{
			wipe.startScreen[x] = graphics.oldBuffer[x].slice();
			wipe.endScreen[x] = graphics.screenBuffer[x].slice();
		}
		wipe.columns[0] = -(M_Random()%16);
		for(var x = 1; x < w; x++)
		{
			var r = (M_Random()%3) - 1
			wipe.columns[x] = wipe.columns[x-1] + r;
			if(wipe.columns[x] > 0) wipe.columns[x] = 0;
			else if(wipe.columns[x] == -16) wipe.columns[x] = -15;
		}
	}
	var nothing = true;
	for(var x = 0; x < w; x++)
	{
		if(wipe.columns[x] < 0)
		{
			nothing = false;
			wipe.columns[x]++;
			for(var y = 0; y < graphics.height; y++)
			{
				for(var T = 0; T <= 1; T++)
				{
					graphics.screenBuffer[(x*2)+T][y] = wipe.startScreen[(x*2)+T][y];
				}
			}
		}
		else if(wipe.columns[x] >= 0)
		{
			if(wipe.columns[x] < graphics.height) nothing = false;
			var dy = (wipe.columns[x] < 16) ? wipe.columns[x]+1 : 8;
			if(wipe.columns[x] + dy >= graphics.height) dy = graphics.height - wipe.columns[x];
			wipe.columns[x]+=dy;
			for(var y = 0; y < graphics.height; y++)
			{
				for(var T = 0; T <= 1; T++)
				{
					if(y < wipe.columns[x])
					{
						graphics.screenBuffer[(x*2)+T][y] = wipe.endScreen[(x*2)+T][y];
					}
					else
					{
						graphics.screenBuffer[(x*2)+T][y] = wipe.startScreen[(x*2)+T][y-wipe.columns[x]];
					}
				}
			}
		}
	}
	if(nothing)
	{
		wipe.end();
	}
}