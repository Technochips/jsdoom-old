var menu = {}
var menuactive = false;

menu.itemOn = 0;
menu.whichSkull = 0;
menu.skullAnimCounter = 10;
menu.skullName = ["M_SKULL1","M_SKULL2"];

menu.message = {};
menu.message.toPrint = false;
menu.message.lastMenuActive;
menu.message.string;
menu.message.routine;
menu.message.needsInput;

menu.currentMenu = "mainmenu";

class Menuitem
{
	status;
	name;
	routine;
	alphaKey;
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
	numitems;
	prevMenu;
	menuitems;
	routine;
	x;
	y;
	lastOn;
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
	this.SetupNextMenu("mainmenu", false)
	menuactive = true;
}
menu.unpause = function()
{
	menuactive = false;
	this.message.toPrint = false;
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
	if(this.message.toPrint)
	{
		var start = 0;
		var y = Math.floor(100 - font.stringHeight(this.message.string)/2);
		var string = this.message.string.split("\n");
		for(var i in string)
		{
			var x = Math.ceil(160 - font.stringWidth(string[i])/2);
			font.drawText(string[i], x, y);
			y += Patch.getPatch(font.hu_font["!"]).height;
		}
		return;
	}

	if(!menuactive)
	{
		return;
	}

	var c = menu[this.currentMenu];
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
		Patch.drawPatch(this.skullName[this.whichSkull], x-32, c.y - 5 + this.itemOn*16);
	}
}
menu.update = function()
{
	this.skullAnimCounter--;
	if(this.skullAnimCounter <= 0)
	{
		this.whichSkull ^= 1;
		this.skullAnimCounter = 8;
	}

	if(menuactive)
	{
		if(menu.message.toPrint)
		{
			if(menu.message.routine) menu.message.routine(input.firstKeyPressed());
		}
		if((input.firstInputs["Escape"] && !menu.message.toPrint) || ((input.firstInputs["Escape"]||input.firstInputs["KeyN"]) && menu.message.toPrint && menu.message.needsInput) || (input.hasKeyPressed() && menu.message.toPrint && !menu.message.needsInput))
		{
			menu.unpause();
			sound.playSound("SWTCHX");
			return;
		}
		if(menu.message.toPrint) return;
		if(input.firstInputs["ArrowUp"])
		{
			this.itemOn--;
			if(this.itemOn < 0) this.itemOn = menu[this.currentMenu].numitems-1;
			sound.playSound("PSTOP");
		}
		else if(input.firstInputs["ArrowDown"])
		{
			this.itemOn++;
			if(this.itemOn >= menu[this.currentMenu].numitems) this.itemOn = 0;
			sound.playSound("PSTOP");
		}
		else if(input.firstInputs["Backspace"])
		{
			if(menu[this.currentMenu].prevMenu)
			{
				menu.SetupNextMenu(menu[this.currentMenu].prevMenu);
				sound.playSound("SWTCHN");
			}
		}
		else if(input.firstInputs["Enter"])
		{
			if(menu[this.currentMenu].menuitems[this.itemOn].routine)
				menu[this.currentMenu].menuitems[this.itemOn].routine(this.itemOn);
			sound.playSound("PISTOL");
		}
		else if(input.hasKeyPressed())
		{
			var x = this.itemOn;
			for(var i = 0; i < menu[this.currentMenu].numitems; i++)
			{
				x++;
				if(x >= menu[this.currentMenu].numitems) x = 0;
				if(menu[this.currentMenu].menuitems[x].alphaKey == input.firstKeyPressed())
				{
					this.itemOn = x;
					sound.playSound("PSTOP");
					break;
				}
			}
		}
	}
	else
	{
		if(input.firstInputs["Escape"])
		{
			menu.pause();
			sound.playSound("SWTCHN");
		}
		else if(input.hasKeyPressed())
		{
			if(onTitle)
			{
				menu.pause();
			}
		}
	}
}

menu.SetupNextMenu = function(m, playSound)
{
	if(menu[m])
	{
		menu[this.currentMenu].lastOn = this.itemOn;
		this.currentMenu = m;
		this.itemOn = menu[this.currentMenu].lastOn;
		menu.message.toPrint = false;
	}
}

menu.episodeRoutine = function(ep)
{
	if(gamemode == "shareware" && ep > 0)
	{
		menu.message.startMessage(doom_txt["SWSTRING"], null, false);
		return;
	}
	menu.wantedEpisode = ep;
	menu.SetupNextMenu("newgame");
}

menu.verifyNightmare = function(ch)
{
	if(ch!="KeyY") return;
	menuactive = false;
	changeState("game", 1, gamemode == "commercial" ? 1 : menu.wantedEpisode, 4);
	onTitle = false;
	menu.message.toPrint = false;
}

menu.skillRoutine = function(sk)
{
	if(sk >= 4)
	{
		menu.message.startMessage(doom_txt["NIGHTMARE"], menu.verifyNightmare, true);
		return;
	}
	menuactive = false;
	changeState("game", 1, gamemode == "commercial" ? 1 : menu.wantedEpisode, sk);
	onTitle = false;
}

menu["mainmenu"] = new Menu(
	6,
	null,
	[
		new Menuitem(1, "M_NGAME", "KeyN", ()=>
		{
			if(gamemode == "commercial")
				menu.SetupNextMenu("newgame");
			else
				menu.SetupNextMenu("episode");
		}),
		new Menuitem(1, "M_OPTION", "KeyO", null),
		new Menuitem(1, "M_LOADG", "KeyL", null),
		new Menuitem(1, "M_SAVEG", "KeyS", null),
		new Menuitem(1, "M_RDTHIS", "KeyR", null),
		new Menuitem(1, "M_QUITG", "KeyQ", ()=>
		{
			var endstring;
			var msg = gamemode == "commercial" ? doom2_endmsg : doom1_endmsg;
			if(doom_txt.language != "english")
				endstring = endmsg[0] + "\n\n" + doom_txt["DOSY"];
			else
				endstring = msg[gametic%msg.length] + "\n\n" + doom_txt["DOSY"];
			menu.message.startMessage(endstring, (ch)=>
			{
				if(ch != "KeyY") return;
				quit();
			}, true);
		}),
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
		new Menuitem(1, "M_EPI1", "KeyK", menu.episodeRoutine),
		new Menuitem(1, "M_EPI2", "KeyT", menu.episodeRoutine),
		new Menuitem(1, "M_EPI3", "KeyI", menu.episodeRoutine),
		new Menuitem(1, "M_EPI4", "KeyT", menu.episodeRoutine),
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
		new Menuitem(1, "M_JKILL",	"KeyI", menu.skillRoutine),
		new Menuitem(1, "M_ROUGH",	"KeyH", menu.skillRoutine),
		new Menuitem(1, "M_HURT",	"KeyH", menu.skillRoutine),
		new Menuitem(1, "M_ULTRA",	"KeyU", menu.skillRoutine),
		new Menuitem(1, "M_NMARE",	"KeyN", menu.skillRoutine),
	],
	function()
	{
		Patch.drawPatch("M_NEWG", 96, 14);
		Patch.drawPatch("M_SKILL", 54, 38);
	},
	48, 63,
	2
);

menu.message.startMessage = function(string, routine, input)
{
	this.lastMenuActive = menuactive
	this.toPrint = true;
	this.string = string;
	this.routine = routine;
	this.needsInput = input;
}
menu.message.stopMessage = function(string, routine, input)
{
	menuactive = this.lastMenuActive;
	this.toPrint = false;
}