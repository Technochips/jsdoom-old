gamestates["game"] = {};
gamestates["game"].map;


gamestates["game"].changedTo = function(map)
{
	this.map = map;
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