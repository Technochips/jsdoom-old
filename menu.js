var menu = {}
var paused = false;

var itemOn = 0;
var whichSkull = 0;
var skullAnimCounter = 10;
var skullName = ["M_SKULL1","M_SKULL2"];

var currentMenu = "mainmenu";

class Menuitem
{
	constructor(status, name, alphaKey, routine)
	{
		this.status = status;
		this.name = name;
		this.routine = routine;
		this.alphaKey = alphaKey;
	}
}
class Menu
{
	constructor(numitems, prevMenu, menuitems, routine, x, y, lastOn)
	{
		this.numitems = numitems;
		this.prevMenu = prevMenu;
		this.menuitems = menuitems;
		this.routine = routine,
		this.x = x;
		this.y = y;
		this.lastOn = lastOn;
	}
}

menu.pause = function()
{
	currentMenu = "mainmenu";
	paused = true;
}
menu.unpause = function()
{
	paused = false;
}

menu.init = function()
{
	window.addEventListener("keydown", menu.onKeyDown, true);
}

menu.draw = function()
{
	if(paused)
	{
		var c = menu[currentMenu];
		if(c)
		{
			if(c.routine)
			{
				c.routine();
			}

			var x = c.x;
			var y = c.y;
			for(var i = 0; i < c.numitems; i++)
			{
				if(c.menuitems[i].name)
				{
					drawPatch(c.menuitems[i].name, x, y);
				}
				y += 16;
			}
			drawPatch(skullName[whichSkull], x-32, c.y - 5 + itemOn*16);
		}
	}
}
menu.update = function()
{
	skullAnimCounter--;
	if(skullAnimCounter <= 0)
	{
		whichSkull ^= 1;
		skullAnimCounter = 8;
	}
}

menu.onKeyDown = function(e)
{
	if(paused)
	{
		switch(e.keyCode)
		{
			case 27:
				menu.unpause();
				break;
			case 38:
				itemOn--;
				if(itemOn < 0) itemOn = menu[currentMenu].numitems-1;
				break;
			case 40:
				itemOn++;
				if(itemOn >= menu[currentMenu].numitems) itemOn = 0;
				break;
			case 8:
				if(menu[currentMenu].prevMenu)
					currentMenu = prevMenu;
				break;
			case 13:
				if(menu[currentMenu].menuitems[itemOn].routine)
					menu[currentMenu].menuitems[itemOn].routine();
				break;
		}
	}
	else
	{
		if(e.keyCode == 27)
		{
			menu.pause();
			//playsound
		}
		if(title)
		{
			menu.pause();
		}
	}
}

menu["mainmenu"] = new Menu(
	6,
	null,
	[
		new Menuitem(1, "M_NGAME", "n", function(){console.log("new game yee");}),
		new Menuitem(1, "M_OPTION", "o", null),
		new Menuitem(1, "M_LOADG", "l", null),
		new Menuitem(1, "M_SAVEG", "s", null),
		new Menuitem(1, "M_RDTHIS", "r", null),
		new Menuitem(1, "M_QUITG", "q", null),
	],
	function()
	{
		drawPatch("M_DOOM", 92, 2);
	},
	97, 64,
	0
)

menu.SetupNextMenu = function(menu)
{
	currentMenu = menu;
	itemOn = currentMenu.lastOn;
}