class Nodes
{
	x;
	y;
	dx;
	dy;
	
	rbb;
	lbb;

	rnc;
	lnc;
	rc;
	lc;
	constructor(lump, offset = (lump.lumpLength/28)-1)
	{
		var o = offset*28
		this.x = lump.lumpDataView.getInt16(o, true);
		this.y = lump.lumpDataView.getInt16(o+2, true);
		this.dx = lump.lumpDataView.getInt16(o+4, true);
		this.dy = lump.lumpDataView.getInt16(o+6, true);
		this.rbb =
		[
			lump.lumpDataView.getInt16(o+8, true),
			lump.lumpDataView.getInt16(o+10, true),
			lump.lumpDataView.getInt16(o+12, true),
			lump.lumpDataView.getInt16(o+14, true),
		];
		this.lbb =
		[
			lump.lumpDataView.getInt16(o+16, true),
			lump.lumpDataView.getInt16(o+18, true),
			lump.lumpDataView.getInt16(o+20, true),
			lump.lumpDataView.getInt16(o+22, true),
		];

		this.rnc = lump.lumpDataView.getUint16(o+24, true).toString(2).padStart(16,"0");
		this.lnc = lump.lumpDataView.getUint16(o+26, true)
		.toString(2).padStart(16,"0");
		var rt = this.rnc[0] == "1";
		var lt = this.lnc[0] == "1";
		this.rnc = parseInt(this.rnc.substring(1),2);
		this.lnc = parseInt(this.lnc.substring(1),2);
		if(!rt) this.rc = new Nodes(lump, this.rnc);
		if(!lt) this.lc = new Nodes(lump, this.lnc);
	}
}