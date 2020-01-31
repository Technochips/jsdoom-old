class Patch
{
	constructor(lump)
	{
		this.lump = lump;
		this.width = lump.lumpDataView.getUint16(0, true);
		this.height = lump.lumpDataView.getUint16(2, true);
		this.xOffset = lump.lumpDataView.getInt16(4, true);
		this.yOffset = lump.lumpDataView.getInt16(6, true);
		this.img = [];
		
		this.columns = [];
		
		for(var i = 0; i < this.width; i++)
		{
			this.img[i] = [];
			for(var y = 0; y < this.height; y++)
			{
				this.img[i][y] = -1; //transparency
			}
			this.columns[i] = [];
			this.columns[i].offset = lump.lumpDataView.getUint32(8+(i*4), true);
			
			var topdelta = 0x00;
			var length = 0;
			for(var k = 0; topdelta < 0xFF; k++)
			{
				topdelta = lump.lumpDataView.getUint8(this.columns[i].offset+length);
				if(topdelta >= 0xFF) break;
				this.columns[i][k] = {};
				this.columns[i][k].topdelta = topdelta;
				this.columns[i][k].size = lump.lumpDataView.getUint8(this.columns[i].offset+length+1);
				this.columns[i][k].data = [];
				for(var j = 0; j < this.columns[i][k].size; j++)
				{
					this.columns[i][k].data[j] = lump.lumpDataView.getUint8(this.columns[i].offset+length+3+j);
					if(topdelta+j < this.height)
						this.img[i][topdelta+j] = this.columns[i][k].data[j];
				}
				length += this.columns[i][k].size+4
			}
			if(topdelta >= 0xFF) continue;
		}
	}
}