class Thing
{
	x;
	y;
	angle;
	type;
	flags = {};

	constructor(lumps, level, offset)
	{
		var o = offset*10;
		this.x = lumps.things.lumpDataView.getInt16(o, true);
		this.y = lumps.things.lumpDataView.getInt16(o+2, true);
		this.angle = lumps.things.lumpDataView.getUint16(o+4, true);
		this.type = lumps.things.lumpDataView.getUint16(o+6, true);
		var flags = lumps.things.lumpDataView.getUint16(o+8, true).toString(2).padStart(8,"0");
		this.flags.easy = flags[7] == "1"
		this.flags.normal = flags[6] == "1"
		this.flags.hard = flags[5] == "1"
		this.flags.ambush = flags[4] == "1"
		this.flags.multiplayer = flags[3] == "1"
	}
}