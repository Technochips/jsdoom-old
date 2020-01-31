var wipe = {};

wipe.gonnaWipe = false;
wipe.wiping = false;
wipe.startScreen;
wipe.endScreen;
wipe.columns = [];
wipe.frame;

wipe.startWiping = function()
{
	wipe.gonnaWipe = true;
	wipe.columns = [];
	wipe.startScreen = [];
	wipe.endScreen = [];
	wipe.frame = 0;
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
	wipe.frame++;
	if(!wipe.wiping)
	{
		wipe.wiping = true;
		for(var x = 0; x < width; x++)
		{
			wipe.startScreen[x] = oldBuffer[x].slice();
			wipe.endScreen[x] = screenBuffer[x].slice();
		}
	}
	var w = width/2;
	var nothing = true;
	for(var x = 0; x < w; x++)
	{
		if(!wipe.columns[x])
		{
			wipe.columns[x] = {};
			wipe.columns[x].initiazeAt = Math.floor(M_Random()/(255/8))+1;
		}
		if(!wipe.columns[x].initiazed) wipe.columns[x].initiazed = wipe.frame >= wipe.columns[x].initiazeAt;
		if(wipe.columns[x].initiazed)
		{
			for(var y = height-1; y >= 0; y--)
			{
				if(y - 8 > 0)
				{
					wipe.startScreen[x*2][y] = wipe.startScreen[x*2][y-8];
					wipe.startScreen[(x*2)+1][y] = wipe.startScreen[(x*2)+1][y-8];
				}
				else
				{
					wipe.startScreen[x*2][y] = -1;
					wipe.startScreen[(x*2)+1][y] = -1;
				}
			}
		}
	}
	for(var x = 0; x < width; x++)
	{
		for(var y = 0; y < height; y++)
		{
			if(wipe.startScreen[x][y] > -1)
			{
				nothing = false;
				screenBuffer[x][y] = wipe.startScreen[x][y];
			}
			else
			{
				screenBuffer[x][y] = wipe.endScreen[x][y];
			}
		}
	}
	if(nothing)
	{
		wipe.end();
	}
}