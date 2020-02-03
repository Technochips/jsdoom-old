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
	p = [];
	players;

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
		this.p[0] = lump.lumpDataView.getUint8(9) > 0;
		this.p[1] = lump.lumpDataView.getUint8(10) > 0;
		this.p[2] = lump.lumpDataView.getUint8(11) > 0;
		this.p[3] = lump.lumpDataView.getUint8(12) > 0;
		this.players = this.p[0]+this.p[1]+this.p[2]+this.p[3];

		var f = 0;
		for(var i = 13; i < lump.lumpLength-3; i+=(4*this.players))
		{
			this.frames[f] = [];
			for(var P = 0; P < 4; P++)
			{
				if(this.p[P])
				{
					var flag = lump.lumpDataView.getUint8(i+P+3).toString(2).padStart(8, "0");
					var specialMode = flag.charAt(0) != 0;
					this.frames[f][P] = new TicInput(
						lump.lumpDataView.getInt8(i+P),
						lump.lumpDataView.getInt8(i+P+1),
						lump.lumpDataView.getInt8(i+P+2),
						specialMode ? false : (flag.charAt(7) != 0),
						specialMode ? false : (flag.charAt(6) != 0),
						!specialMode ? false : (flag.charAt(7) != 0),
						!specialMode ? 0 : ((flag.charAt(6) != 0) ? (parseInt(flag.substring(3, 6), 2)+1) : 0),
						specialMode ? 0 : ((flag.charAt(5) != 0) ? (parseInt(flag.substring(2, 5), 2)+1) : 0));
				}
			}
			f++;
		}
	}
}

demo.loadDemo = function(lump)
{
	demo.currentDemo = new Demo(lump);
	demo.playingDemo = true;
	demo.frame = 0;
	changeState("game", onTitle, demo.currentDemo.map, demo.currentDemo.episode, demo.currentDemo.skill, demo.currentDemo.p, demo.currentDemo.player)
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
			if(onTitle) changeState("title", true, false);
			else quit();
		}
	}
}