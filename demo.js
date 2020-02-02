demo = {};
demo.playingDemo = false;

demo.currentDemo;
demo.frame = 0;

class Demo
{
	version;
	skill;
	episode;
	map;
	multiplayer;
	respawn;
	fast;
	nomonsters;
	player;
	p1;
	p2;
	p3;
	p4;

	frames = [];
	constructor(lump)
	{
		this.version = lump.lumpDataView.getUint8(0);
		this.skill = lump.lumpDataView.getUint8(1);
		this.episode = lump.lumpDataView.getUint8(2);
		this.map = lump.lumpDataView.getUint8(3);
		this.multiplayer = lump.lumpDataView.getUint8(4);
		this.respawn = lump.lumpDataView.getUint8(5) > 0;
		this.fast = lump.lumpDataView.getUint8(6) > 0;
		this.nomonsters = lump.lumpDataView.getUint8(7) > 0;
		this.player = lump.lumpDataView.getUint8(8);
		this.p1 = lump.lumpDataView.getUint8(9) > 0;
		this.p2 = lump.lumpDataView.getUint8(10) > 0;
		this.p3 = lump.lumpDataView.getUint8(11) > 0;
		this.p4 = lump.lumpDataView.getUint8(12) > 0;

		var f = 0;
		for(var i = 13; i < lump.lumpLength-3; i++)
		{
			this.frames[f] = new TicInput(lump.lumpDataView.getInt8(i), lump.lumpDataView.getInt8(i+1), lump.lumpDataView.getInt8(i+2));
			f++;
		}
	}
}

demo.loadDemo = function(lump)
{
	demo.currentDemo = new Demo(lump);
	demo.playingDemo = true;
	demo.frame = 0;
	changeState("game", gamemode == "commercial" ? ("MAP" + String(this.map).padStart(2, "0")) : ("E" + this.episode + "M" + this.map))
}

demo.update = function()
{
	if(demo.playingDemo)
	{
		input.ticinput = demo.currentDemo.frames[demo.frame];
		demo.frame++;
		if(demo.frame >= demo.currentDemo.frames.length)
		{
			demo.playingDemo = false;
			if(onTitle) changeState("title", false);
			else quit();
		}
	}
}