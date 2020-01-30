class WAD
{
	constructor(data)
	{
		this.data = data;
		this.dataView = new DataView(data);
		this.type = this.checkType();
		if(this.type == null) throw "File is not a valid WAD!"
		this.files = []
		this.fileCount = this.dataView.getInt32(4, true);
		console.log("found " + this.fileCount + " files in WAD.");
		this.dirOffset = this.dataView.getInt32(8, true);
		
		var decoder = new TextDecoder("utf-8");
		
		for(var i = 0; i < this.fileCount; i++)
		{
			loadText = "Loading file " + (i+1) + " out of " + this.fileCount + "."
			this.files[i] = []
			this.files[i].fileOffset = this.dataView.getInt32((this.dirOffset + (i*16)) + 0, true);
			this.files[i].fileLength = this.dataView.getInt32((this.dirOffset + (i*16)) + 4, true);
			this.files[i].name = decoder.decode(new Uint8Array(this.data, (this.dirOffset + (i*16)) + 8, 8)).replace(/\u0000.*$/g, "");
			
			this.files[i].fileData = new Uint8Array(this.data, this.files[i].fileOffset, this.files[i].fileLength);
			
			if(this.files[i].name == "PLAYPAL")
			{
				var l = (this.files[i].fileLength / 768)-1; //sick hack for optimization
				for(var k = 0; k <= l; k++)
				{
					playpal[k] = []
					for(var j = 0; j < 255; j++) playpal[k][j] = [this.files[i].fileData[(k*768)+(j*3)],this.files[i].fileData[(k*768)+(j*3+1)],this.files[i].fileData[(k*768)+(j*3+2)]];
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
}