class Subsector
{
	segs = [];
	constructor(lumps, level, offset)
	{
		var o = offset*4;
		var segcount = lumps.ssectors.lumpDataView.getUint16(o, true);
		var segfirst = lumps.ssectors.lumpDataView.getUint16(o+2, true);
		for(var i = 0; i < segcount; i++)
		{
			this.segs[i] = level.getSeg(i+segfirst);
		}
	}

	draw(ox, oy, angle, recursion = 0)
	{
		if(recursion >= 32) return;
		var c = recursion+80;
		var x = ox - (graphics.width/2);
		var y = oy - (graphics.height/2);
		for(var seg in this.segs)
		{
			var s = this.segs[seg].direction == 0 ? this.segs[seg].startvertex : this.segs[seg].endvertex;
			var e = this.segs[seg].direction == 1 ? this.segs[seg].startvertex : this.segs[seg].endvertex;
			graphics.drawLine(c,
			Math.floor((s.x/16)-x),
			Math.floor((s.y/16)-y),
			Math.floor((e.x/16)-x),
			Math.floor((e.y/16)-y));
		}
		var s = this.segs[this.segs.length-1].endvertex;
		var e = this.segs[0].startvertex;
	}
}