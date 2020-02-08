class Seg
{
	startvertex;
	endvertex;
	angle;
	linedef;
	direction;
	offset;
	constructor(lumps, level, offset)
	{
		var o = offset*12;
		this.startvertex = level.getVertex(lumps.segs.lumpDataView.getInt16(o, true));
		this.endvertex = level.getVertex(lumps.segs.lumpDataView.getInt16(o+2, true));
		this.angle = lumps.segs.lumpDataView.getInt16(o+4,true);
		this.linedef = level.getLinedef(lumps.segs.lumpDataView.getUint16(o+6, true));
		this.direction = lumps.segs.lumpDataView.getUint16(o+8, true);
		this.offset = lumps.segs.lumpDataView.getInt16(o+10, true);
	}
}