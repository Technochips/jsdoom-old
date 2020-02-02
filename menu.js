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
	menu.SetupNextMenu("mainmenu", false)
	paused = true;
}
menu.unpause = function()
{
	paused = false;
}

menu.init = function()
{
	switch(gamemode)
	{
		case "commercial":
			menu["mainmenu"].menuitems[4] = menu["mainmenu"].menuitems[5];
			menu["mainmenu"].numitems--;
			menu["mainmenu"].y += 8;
			menu["newgame"].prevMenu = "mainmenu";
			break;
		case "shareware":
		case "registered":
			menu["episode"].numitems--;
			break;
	}
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
					Patch.drawPatch(c.menuitems[i].name, x, y);
				}
				y += 16;
			}
			Patch.drawPatch(skullName[whichSkull], x-32, c.y - 5 + itemOn*16);
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
	if(wipe.wiping) return;
	if(paused)
	{
		switch(e.code)
		{
			case "Escape":
				menu.unpause();
				return true;
			case "ArrowUp":
				itemOn--;
				if(itemOn < 0) itemOn = menu[currentMenu].numitems-1;
				return true;
			case "ArrowDown":
				itemOn++;
				if(itemOn >= menu[currentMenu].numitems) itemOn = 0;
				return true;
			case "Backspace":
				if(menu[currentMenu].prevMenu) menu.SetupNextMenu(menu[currentMenu].prevMenu);
				return true;
			case "Enter":
				if(menu[currentMenu].menuitems[itemOn].routine)
					menu[currentMenu].menuitems[itemOn].routine();
				return true;
		}
	}
	else
	{
		if(e.keyCode == 27)
		{
			menu.pause();
			//playsound
			return true;
		}
		if(title)
		{
			menu.pause();
			return true;
		}
	}
}

menu["mainmenu"] = new Menu(
	6,
	null,
	[
		new Menuitem(1, "M_NGAME", "n", function()
		{
			if(gamemode == "commercial")
				menu.SetupNextMenu("newgame");
			else
				menu.SetupNextMenu("episode");
		}),
		new Menuitem(1, "M_OPTION", "o", null),
		new Menuitem(1, "M_LOADG", "l", null),
		new Menuitem(1, "M_SAVEG", "s", null),
		new Menuitem(1, "M_RDTHIS", "r", null),
		new Menuitem(1, "M_QUITG", "q", null),
	],
	function()
	{
		Patch.drawPatch("M_DOOM", 94, 2);
	},
	97, 64,
	0
);

menu["episode"] = new Menu(
	4,
	"mainmenu",
	[
		new Menuitem(1, "M_EPI1", "k", function()
		{
			menu.SetupNextMenu("newgame");
		}),
		new Menuitem(1, "M_EPI2", "t", function()
		{
			menu.SetupNextMenu("newgame");
		}),
		new Menuitem(1, "M_EPI3", "i", function()
		{
			menu.SetupNextMenu("newgame");
		}),
		new Menuitem(1, "M_EPI4", "t", function()
		{
			menu.SetupNextMenu("newgame");
		}),
	],
	function()
	{
		Patch.drawPatch("M_EPISOD", 54, 38);
	},
	48, 63,
	0
);

menu["newgame"] = new Menu(
	5,
	"episode",
	[
		new Menuitem(1, "M_JKILL",	"i", null),
		new Menuitem(1, "M_ROUGH",	"i", null),
		new Menuitem(1, "M_HURT",	"i", null),
		new Menuitem(1, "M_ULTRA",	"i", null),
		new Menuitem(1, "M_NMARE",	"i", null),
	],
	function()
	{
		Patch.drawPatch("M_NEWG", 96, 14);
		Patch.drawPatch("M_SKILL", 54, 38);
	},
	48, 63,
	2
);

menu.SetupNextMenu = function(m, playSound)
{
	if(menu[m])
	{
		menu[currentMenu].lastOn = itemOn;
		currentMenu = m;
		itemOn = menu[currentMenu].lastOn;
	}
}