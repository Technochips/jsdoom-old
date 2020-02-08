class Sector
{
	floorHeight;
	ceilingHeight;
	floorTexture;
	ceilingTexture;
	light;
	type;
	tag;
	constructor(lumps, level, offset)
	{
		var o = offset*26;
		this.floorHeight = lumps.sectors.lumpDataView.getInt16(o, true);
		this.ceilingHeight = lumps.sectors.lumpDataView.getInt16(o+2, true);
		this.floorTexture = decoder.decode(new Uint8Array(lumps.sectors.lumpData, o+4, 8)).replace(/\u0000.*$/g, "")
		this.ceilingTexture = decoder.decode(new Uint8Array(lumps.sectors.lumpData, o+12, 8)).replace(/\u0000.*$/g, "")
		this.light = lumps.sectors.lumpDataView.getInt16(o+20, true);
		this.type = lumps.sectors.lumpDataView.getInt16(o+22, true);
		this.tag = lumps.sectors.lumpDataView.getInt16(o+24, true);
	}
}