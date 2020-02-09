gamestates["title"] = {};
gamestates["title"].cycle = 0;
gamestates["title"].cycles =
[
	"TITLEPIC", "CREDIT", "CREDIT", null
];
gamestates["title"].music =
[
	"D_INTROA", null, null, null
];
gamestates["title"].frame = 0;

gamestates["title"].init = function()
{
	if(gamemode != "registered")
	{
		this.cycles.pop();
		this.music.pop();
	}
}

gamestates["title"].changedTo = function(reset)
{
	demo.playingDemo = false;
	this.frame = 0;
	this.cycle++;
	if(reset || this.cycle >= this.cycles.length) this.cycle = 0;
}
gamestates["title"].update = function()
{
	this.frame++;
	if(!this.cycles[this.cycle] || this.frame >= 175)
	{
		demo.loadDemo(wad.getLastLump("DEMO" + (this.cycle+1)));
	}
}
gamestates["title"].draw = function()
{
	if(this.cycles[this.cycle]) Patch.drawPatch(this.cycles[this.cycle],0,0);
}