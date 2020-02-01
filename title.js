gamestates["title"] = {}
gamestates["title"].cycle = 0;
gamestates["title"].cycles =
[
	"TITLEPIC", "CREDIT", "CREDIT", null
]
gamestates["title"].music =
[
	"D_INTROA", null, null, null
]
gamestates["title"].frame = 0;

gamestates["title"].changedTo = function(reset)
{
	this.frame = 0;
	this.cycle++;
	if(reset || this.cycle >= this.cycles.length) this.cycle = 0;
}
gamestates["title"].update = function()
{
	this.frame++;
	if(!this.cycles[this.cycle] || this.frame >= 175)
	{
		changeState("title", true);
	}
}
gamestates["title"].draw = function()
{
	if(this.cycles[this.cycle]) drawPatch(this.cycles[this.cycle],0,0);
}