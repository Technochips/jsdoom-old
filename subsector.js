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
		//if(recursion >= 8) return recursion;
		var c = 80;//(recursion*4)+80;
		var a = (angle-90)*(Math.PI/180);
		var angcos = Math.cos(a);
		var angsin = Math.sin(a);
		var x = (ox)*angcos-(-oy)*angsin - (graphics.width/2);
		var y = (ox)*angsin+(-oy)*angcos - (graphics.height/2);
		for(var seg in this.segs)
		{
			var s = this.segs[seg].direction == 0 ? this.segs[seg].startvertex : this.segs[seg].endvertex;
			var e = this.segs[seg].direction == 1 ? this.segs[seg].startvertex : this.segs[seg].endvertex;
			graphics.drawLine(c,
			Math.floor((s.x*angcos - -s.y*angsin)-x),
			Math.floor((s.x*angsin + -s.y*angcos)-y),
			Math.floor((e.x*angcos - -e.y*angsin)-x),
			Math.floor((e.x*angsin + -e.y*angcos)-y));
		}
		var s = this.segs[this.segs.length-1].endvertex;
		var e = this.segs[0].startvertex;
		return recursion;
	}
}