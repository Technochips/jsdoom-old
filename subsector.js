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
		var ax = (ox)*angcos-(-oy)*angsin; //stands for (yet) **A**nother (fucking) x (variable)
		var ay = (ox)*angsin+(-oy)*angcos; //same for this, i ran out of variable names
		var x = ax - (graphics.width/2);
		var y = ay - (graphics.height/2);
		for(var seg in this.segs)
		{
			var s = this.segs[seg].direction == 0 ? this.segs[seg].startvertex : this.segs[seg].endvertex;
			var e = this.segs[seg].direction == 1 ? this.segs[seg].startvertex : this.segs[seg].endvertex;
			var sx = s.x*angcos - -s.y*angsin;
			var sy = s.x*angsin + -s.y*angcos;
			var ex = e.x*angcos - -e.y*angsin;
			var ey = e.x*angsin + -e.y*angcos;
			var sa = Math.atan2(sx-ax,sy-ay)*180/Math.PI;
			var ea = Math.atan2(ex-ax,ey-ay)*180/Math.PI;
			if((sa < -135 || sa > 135) || (ea < -135 || ea > 135))
				graphics.drawLine(c,
				Math.floor(sx-x),
				Math.floor(sy-y),
				Math.floor(ex-x),
				Math.floor(ey-y));
		}
		var s = this.segs[this.segs.length-1].endvertex;
		var e = this.segs[0].startvertex;
		return recursion;
	}
}