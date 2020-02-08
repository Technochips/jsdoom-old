class WAD
{
	data;
	dataView;
	type;
	lumps;
	lumpCount;
	diroffset;
	constructor(data)
	{
		this.data = data;
		this.dataView = new DataView(data);
		this.type = this.checkType();
		if(this.type == null) throw "File is not a valid WAD!"
		this.lumps = []
		this.lumpCount = this.dataView.getInt32(4, true);
		console.log("found " + this.lumpCount + " lumps in WAD.");
		this.dirOffset = this.dataView.getInt32(8, true);
		
		for(var i = 0; i < this.lumpCount; i++)
		{
			this.lumps[i] = []
			this.lumps[i].lumpOffset = this.dataView.getInt32((this.dirOffset + (i*16)) + 0, true);
			this.lumps[i].lumpLength = this.dataView.getInt32((this.dirOffset + (i*16)) + 4, true);
			this.lumps[i].name = decoder.decode(new Uint8Array(this.data, (this.dirOffset + (i*16)) + 8, 8)).replace(/\u0000.*$/g, "");
			
			this.lumps[i].lumpData = this.data.slice(this.lumps[i].lumpOffset, this.lumps[i].lumpLength + this.lumps[i].lumpOffset);
			this.lumps[i].lumpDataView = new DataView(this.lumps[i].lumpData);
			
			if(this.lumps[i].name == "PLAYPAL") playpal.loadPalette(this.lumps[i]);
		}
	}
	checkType()
	{
		var s = new Uint8Array(this.data, 0, 4);
		if(s[1] == 87 && s[2] == 65 && s[3] == 68)
		{
			if(s[0] == 73)
				return "IWAD";
			else if(s[0] == 80)
				return "PWAD";
		}
		return null;
	}
	getFirstLump(lump)
	{
		for(var i = 0; i < this.lumpCount; i++) if(this.lumps[i].name == lump) return this.lumps[i];
	}
	getFirstLumpIndex(lump)
	{
		for(var i = 0; i < this.lumpCount; i++) if(this.lumps[i].name == lump) return i;
	}
	getFirstLumpAfter(lump, after)
	{
		var a = this.getFirstLumpIndex(after);
		if(a != null) for(var i = a; i < this.lumpCount; i++) if(this.lumps[i].name == lump) return this.lumps[i];
	}
}