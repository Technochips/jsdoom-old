gamestates["game"] = {};
gamestates["game"].map;
gamestates["game"].episode;
gamestates["game"].skill;
gamestates["game"].mapname;


gamestates["game"].changedTo = function(map, episode, skill)
{
	this.map = map;
	this.episode = episode;
	this.skill = skill;

	this.mapname = gamemode == "commercial" ? ("MAP" + String(map).padStart(2, "0")) : ("E" + episode + "M" + this.map);
}
gamestates["game"].update = function()
{

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
}