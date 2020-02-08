class Linedef
{
	startvertex;
	endvertex;
	flags;
	type;
	tag;
	front;
	back;
	constructor(lumps, level, offset)
	{
		var o = offset*14;
		this.startvertex = level.getVertex(lumps.linedefs.lumpDataView.getInt16(o, true));
		this.endvertex = level.getVertex(lumps.linedefs.lumpDataView.getInt16(o+2, true));
		this.flags = lumps.linedefs.lumpDataView.getInt16(o+4,true);
		this.type = lumps.linedefs.lumpDataView.getInt16(o+6, true);
		this.tag = lumps.linedefs.lumpDataView.getInt16(o+8, true);
		var front = lumps.linedefs.lumpDataView.getInt16(o+10, true);
		var back = lumps.linedefs.lumpDataView.getInt16(o+12, true);
		if(front > -1) this.front = level.getSidedef(front);
		if(back > -1) this.back = level.getSidedef(back);
	}
}