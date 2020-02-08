class Sidedef
{
	xoffset;
	yoffset;
	upper;
	lower;
	middle;
	sector;
	constructor(lumps, level, offset)
	{
		var o = offset*30;
		this.xoffset = lumps.sidedefs.lumpDataView.getInt16(o, true);
		this.yoffset = lumps.sidedefs.lumpDataView.getInt16(o+2, true);
		this.lower = decoder.decode(new Uint8Array(lumps.sidedefs.lumpData, o+4, 8)).replace(/\u0000.*$/g, "")
		this.upper = decoder.decode(new Uint8Array(lumps.sidedefs.lumpData, o+12, 8)).replace(/\u0000.*$/g, "")
		this.middle = decoder.decode(new Uint8Array(lumps.sidedefs.lumpData, o+20, 8)).replace(/\u0000.*$/g, "")
		this.sector = level.getSector(lumps.sidedefs.lumpDataView.getInt16(o+28, true));
	}
}