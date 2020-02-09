gamestates["game"] = {};
gamestates["game"].map = 1;
gamestates["game"].episode = 1;
gamestates["game"].skill = 2;
gamestates["game"].mapname;
gamestates["game"].players = [true, false, false, false];
gamestates["game"].player = 0;

gamestates["game"].debugShowInputs = true;

gamestates["game"].message = "";
gamestates["game"].messageAway = 0;

gamestates["game"].level;

gamestates["game"].time = 0;
gamestates["game"].timeTotal = 0;


gamestates["game"].changedTo = function(map = 1, episode = 1, skill = 2, players = [true, false, false, false], player = 0, reset = true)
{
	demo.playingDemo = false;
	input.resetTicinput();

	this.map = map;
	this.episode = episode;
	this.skill = skill;
	this.players = players;
	this.player = player;

	this.time = 0;
	if(reset) this.timeTotal = 0;

	this.mapname = gamemode == "commercial" ? ("MAP" + String(map).padStart(2, "0")) : ("E" + episode + "M" + this.map);

	this.level = new Level(this.mapname);
}
gamestates["game"].setMessage = function(message, override = false)
{
	if(gamestate == "game")
	{
		this.messageAway = gametic+140;
		this.message = message;
	}
}
gamestates["game"].update = function()
{
	demo.update();
	if(!demo.playingDemo) input.setTicinputFromGameInput(this.player);
	var m = menuactive && !onTitle;
	if(!menu.paused && !m)
	{
		this.time++;
		this.timeTotal++;
	}
}
gamestates["game"].draw = function()
{
	for(var x = 0; x < graphics.width; x++)
	{
		for(var y = 0; y < graphics.height; y++)
		{
			graphics.drawPixel(0, x, y)
		}
	}
	var spawn = this.level.getFirstThing(1);
	this.level.rootNode.draw(spawn.x,spawn.y,0);
	if(gametic < this.messageAway)
	{
		font.drawText(this.message, 0, 0);
	}

	if(this.debugShowInputs) font.drawText(
	"\nforward: " + input.ticinput[this.player].forward +
	"\nstrafing: " + input.ticinput[this.player].strafing +
	"\nangleturn: " + input.ticinput[this.player].angleturn +
	"\nfire: " + (input.ticinput[this.player].fire ? "yes" : "no") +
	"\nuse: " + (input.ticinput[this.player].use ? "yes" : "no") +
	"\npause: " + (input.ticinput[this.player].pause ? "yes" : "no") +
	"\nsavedOn: " + input.ticinput[this.player].savedOn +
	"\nweapon: " + input.ticinput[this.player].weapon, 0, 0);
}