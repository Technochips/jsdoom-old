class WAD
{
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
		
		var decoder = new TextDecoder("utf-8");
		
		for(var i = 0; i < this.lumpCount; i++)
		{
			tipText = "Loading lump " + (i+1) + " out of " + this.lumpCount + "."
			this.lumps[i] = []
			this.lumps[i].lumpOffset = this.dataView.getInt32((this.dirOffset + (i*16)) + 0, true);
			this.lumps[i].lumpLength = this.dataView.getInt32((this.dirOffset + (i*16)) + 4, true);
			this.lumps[i].name = decoder.decode(new Uint8Array(this.data, (this.dirOffset + (i*16)) + 8, 8)).replace(/\u0000.*$/g, "");
			
			this.lumps[i].lumpData = this.data.slice(this.lumps[i].lumpOffset, this.lumps[i].lumpLength + this.lumps[i].lumpOffset);
			this.lumps[i].lumpDataView = new DataView(this.lumps[i].lumpData);
			
			if(this.lumps[i].name == "PLAYPAL")
			{
				var l = Math.floor(this.lumps[i].lumpLength / 768);
				for(var k = 0; k < l; k++)
				{
					playpal[k] = []
					for(var j = 0; j < 256; j++) playpal[k][j] = [this.lumps[i].lumpDataView.getUint8((k*768)+(j*3)),this.lumps[i].lumpDataView.getUint8((k*768)+(j*3+1)),this.lumps[i].lumpDataView.getUint8((k*768)+(j*3+2))];
				}
				console.log("Loaded " + l + " palettes.");
			}
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
}