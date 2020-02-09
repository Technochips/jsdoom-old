var playpal = {};
playpal.playpal = [[]];
for(var i = 0; i < 256; i++) playpal.playpal[0][i] = [i, i, i];
playpal.current = 0;
playpal.old = 1;

playpal.getPalette = function(i)
{
	if(playpal.playpal[playpal.current])
		return playpal.playpal[playpal.current][i];
	else
		return playpal.playpal[0][i];
}

playpal.loadPalette = function(lump)
{
	var l = Math.floor(lump.lumpLength / 768);
	for(var k = 0; k < l; k++)
	{
		this.playpal[k] = []
		for(var j = 0; j < 256; j++) this.playpal[k][j] = [lump.lumpDataView.getUint8((k*768)+(j*3)),lump.lumpDataView.getUint8((k*768)+(j*3+1)),lump.lumpDataView.getUint8((k*768)+(j*3+2))];
	}
}