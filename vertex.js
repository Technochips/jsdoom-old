class Vertex
{
	x;
	y;
	constructor(lumps, level, offset)
	{
		var o = offset*4;
		this.x = lumps.vertexes.lumpDataView.getInt16(o, true);
		this.y = lumps.vertexes.lumpDataView.getInt16(o+2, true);
	}
}