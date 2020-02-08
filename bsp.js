class Node
{
	x;
	y;
	dx;
	dy;
	
	bb;

	nc;
	c;
	constructor(lumps, level, offset = (lumps.nodes.lumpLength/28)-1)
	{
		var o = offset*28
		this.x = lumps.nodes.lumpDataView.getInt16(o, true);
		this.y = lumps.nodes.lumpDataView.getInt16(o+2, true);
		this.dx = lumps.nodes.lumpDataView.getInt16(o+4, true);
		this.dy = lumps.nodes.lumpDataView.getInt16(o+6, true);
		this.bb =
		[[
			lumps.nodes.lumpDataView.getInt16(o+8, true),
			lumps.nodes.lumpDataView.getInt16(o+10, true),
			lumps.nodes.lumpDataView.getInt16(o+12, true),
			lumps.nodes.lumpDataView.getInt16(o+14, true),
		],
		[
			lumps.nodes.lumpDataView.getInt16(o+16, true),
			lumps.nodes.lumpDataView.getInt16(o+18, true),
			lumps.nodes.lumpDataView.getInt16(o+20, true),
			lumps.nodes.lumpDataView.getInt16(o+22, true),
		]];

		this.nc =
		[
			lumps.nodes.lumpDataView.getUint16(o+24, true).toString(2).padStart(16,"0"),
			lumps.nodes.lumpDataView.getUint16(o+26, true).toString(2).padStart(16,"0")
		];
		this.c = [];
		for(var i = 0; i <= 1; i++)
		{
			var t = this.nc[i][0] == "1";
			this.nc[i] = parseInt(this.nc[i].substring(1),2);
			if(!t) this.c[i] = level.getNode(this.nc[i]);
			else this.c[i] = level.getSubsector(this.nc[i]);
		}
	}

	pointOnSide(x,y)
	{
		if(this.dx==0)
			return x <= this.x ? (this.dy > 0) : (this.dy < 0);
		if(this.dy==0)
			return y <= this.y ? (this.dx < 0) : (this.dx > 0);
		var dx = x - this.x;
		var dy = y - this.y;
		if((this.dy ^ this.dx ^ dx ^ dy).toString(2).padStart(32, "0")[0] != "0")
		{
			return (this.dy ^ dx).toString(2).padStart(32, "0")[0] != "0";
		}
		var left = dx*parseInt(shiftString(this.dy.toString(2).padStart(32, "0"), 16),2);
		var right = dy*parseInt(shiftString(this.dx.toString(2).padStart(32, "0"), 16),2);
		return right < left;
	}

	draw(ox, oy, angle, recursion = 0)
	{
		var a = this.pointOnSide(ox,oy) ? 1 : 0;
		var b = a == 1 ? 0 : 1;
		if(this.c[a]) this.c[a].draw(ox,oy,angle,recursion+1);
		if(this.c[b]) this.c[b].draw(ox,oy,angle,recursion+1);
		//var c = Math.min(111,recursion+80);
		//var x = ox - (graphics.width/2);
		//var y = oy - (graphics.height/2);

		/*if(this.c[a] && this.c[a].constructor.name == "Node")
		{
			graphics.drawLine(c, Math.floor((this.x/16)-x),Math.floor((this.y/16)-y),Math.floor((this.c[a].x/16)-x),Math.floor((this.c[a].y/16)-y));
		}*/
		/*if(this.c[b] && this.c[b].constructor.name == "Node")
		{
			graphics.drawLine(c, Math.floor((this.x/16)-x),Math.floor((this.y/16)-y),Math.floor((this.c[b].x/16)-x),Math.floor((this.c[b].y/16)-y));
		}*/
	}
}