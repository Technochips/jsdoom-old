gamestates["game"] = {};
gamestates["game"].map = 1;
gamestates["game"].episode = 1;
gamestates["game"].skill = 2;
gamestates["game"].mapname;
gamestates["game"].players = [true, false, false, false];
gamestates["game"].player = 0;

gamestates["game"].debugShowInputs = true;

gamestates["game"].message = "";
gamestates["game"].messageOff = 0;


gamestates["game"].changedTo = function(map, episode, skill, players, player)
{
	demo.playingDemo = false;
	input.resetTicinput();

	this.map = map;
	this.episode = episode;
	this.skill = skill;
	this.players = players;
	this.player = player;

	this.mapname = gamemode == "commercial" ? ("MAP" + String(map).padStart(2, "0")) : ("E" + episode + "M" + this.map);
}
gamestates["game"].setMessage = function(message)
{
	this.messageOff = gametic+140;
	this.message = message;
}
gamestates["game"].update = function()
{
	if(!demo.playingDemo && !menuactive)
	{
		input.setTicinputFromGameInput(this.player);
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
	if(gametic < this.messageOff)
	{
		font.drawText(this.message, 0, 0);
	}

	if(this.debugShowInputs) font.drawText(
	"vertical: " + input.ticinput[this.player].vertical +
	"\nstrafing: " + input.ticinput[this.player].strafing +
	"\nturning: " + input.ticinput[this.player].turning +
	"\nfire: " + (input.ticinput[this.player].fire ? "yes" : "no") +
	"\nuse: " + (input.ticinput[this.player].use ? "yes" : "no") +
	"\npause: " + (input.ticinput[this.player].pause ? "yes" : "no") +
	"\nsavedOn: " + input.ticinput[this.player].savedOn +
	"\nweapon: " + input.ticinput[this.player].weapon, 0, 15);
}