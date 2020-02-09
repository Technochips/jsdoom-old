var graphics = {};

graphics.canvas;
graphics.width = 320;
graphics.height = 200;
graphics.cwidth;
graphics.cheight;
graphics.swidth;
graphics.sheight;

graphics.useBuffer = true;
graphics.screenBuffer = [];
graphics.oldBuffer = [];

graphics.ctx;
graphics.ctxData;

graphics.flashing = false; //DEBUG

graphics.init = function(canvas)
{
	this.canvas = canvas;
	this.cwidth = canvas.width;
	this.cheight = canvas.height;
	this.swidth = this.cwidth/this.width;
	this.sheight = this.cheight/this.height;

	for(var x = 0; x < this.width; x++)
	{
		this.screenBuffer[x] = [];
		this.oldBuffer[x] = [];
		for(var y = 0; y < this.height; y++)
		{
			this.screenBuffer[x][y] = 0;
			this.oldBuffer[x][y] = 1;
		}
	}

	if(canvas.getContext)
	{
		this.ctx = canvas.getContext("2d");
		this.ctxData = this.ctx.getImageData(0, 0, this.cwidth, this.cheight);
	}
}

graphics.update = function()
{
	if(this.flashing)
	{
		if(playpal.current > 9) playpal.current --; //DEBUG STUFF
		else
		{
			if(gametic % fps === 0) playpal.current = 12;
			else playpal.current = 0;
		}
	}	
}

graphics.drawPixel = function(color, x, y)
{
	if(x >= 0 && x < this.width && y >= 0 && y < this.height)
	{
		if(this.useBuffer)
		{
			this.screenBuffer[x][y] = color;
		}
		else
		{
			this.ctx.fillStyle = "rgb(" + playpal.getPalette(color)[0] + ", " + playpal.getPalette(color)[1] + ", " + playpal.getPalette(color)[2] + ")";
			this.ctx.fillRect(x,y,1,1);
		}
	}
}
graphics.drawLine = function(color, x0, y0, x1, y1)
{
	var dx = x1 - x0;
	var ax = 2*Math.abs(dx);
	var sx = dx<0?-1:1;
	
	var dy =  y1 - y0;
	var ay = 2*Math.abs(dy);
	var sy = dy<0?-1:1;

	var x = x0;
	var y = y0;
	if(ax > ay)
	{
		var d = ay - ax / 2;
		while(true)
		{
			graphics.drawPixel(color, x, y);
			if(x == x1) return;
			if(d>=0)
			{
				y += sy;
				d -= ax;
			}
			x += sx;
			d += ay;
		}
	}
	else
	{
		var d = ax - ay / 2;
		while(true)
		{
			graphics.drawPixel(color, x, y);
			if(y == y1) return;
			if(d >= 0)
			{
				x += sx;
				d -= ay;
			}
			y += sy;
			d += ax;
		}
	}
}

graphics.applyBuffer = function()
{
	if(this.useBuffer)
	{
		for(var x = 0; x < this.width; x++)
		{
			for(var y = 0; y < this.height; y++)
			{
				var c = (x+(y*this.cwidth))*4;
				if(playpal.current != playpal.old || this.screenBuffer[x][y] != this.oldBuffer[x][y])
				{
					this.ctxData.data[c] = playpal.getPalette(this.screenBuffer[x][y])[0];
					this.ctxData.data[c+1] = playpal.getPalette(this.screenBuffer[x][y])[1];
					this.ctxData.data[c+2] = playpal.getPalette(this.screenBuffer[x][y])[2];
					this.ctxData.data[c+3] = 255;
				}
			}
		}
		this.ctx.putImageData(this.ctxData, 0, 0);
		this.oldBuffer = [];
		for(var x = 0; x < graphics.width; x++)
		{
			this.oldBuffer[x] = this.screenBuffer[x].slice();
		}
		playpal.old = playpal.current;
	}
}