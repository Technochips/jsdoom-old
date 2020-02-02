var font = {};

font.hu_font = [];

font.HU_FONTSTART = 33;
font.HU_FONTEND = 95;
font.HU_FONTSIZE = font.HU_FONTEND-font.HU_FONTSTART+1;

for(var x = font.HU_FONTSTART; x < font.HU_FONTEND; x++)
{
	font.hu_font[String.fromCharCode(x)] = "STCFN" + String(x).padStart(3, '0');
}

font.drawText = function(text, x, y)
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
		else if(this.hu_font[c.toUpperCase()])
		{
			var p = Patch.drawPatch(this.hu_font[c.toUpperCase()], x+w,y+h)
			if(p)
			{
				if(w+p.width > graphics.width) break;
				w+=p.width;
			}
			else if(!useBuffer)
			{
				if(w+8 > graphics.width) break;
				graphics.ctx.fillText(c, x+w, y+h+10);
				w += 8;
			}
		}
		else
		{
			w += 4;
		}
	}
}

font.stringWidth = function(string)
{
	var w = 0;
	for(var i = 0; i < string.length; i++)
	{
		var c = string.charAt(i).toUpperCase();
		if(!font.hu_font[c]) w += 4;
		else w += Patch.getPatch(font.hu_font[c]).width;
	}
	return w;
}
font.stringHeight = function(string)
{
	var height = Patch.getPatch(font.hu_font["!"]).height;
	var h = height;
	for(var i = 0; i < string.length; i++)
	{
		if(string.charAt(i) == '\n') h+=height;
	}
	return h;
}