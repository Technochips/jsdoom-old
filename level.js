class Level
{
	name;
	lumps;

	rootNode;

	linedefs;
	sidedefs;
	vertexes;
	segs;
	subsectors;
	nodes;
	sectors;

	constructor(name)
	{
		this.name = name;
		this.initializeLumps();
		this.rootNode = new Node(this.lumps,this);
	}

	getNode(i)
	{
		if(!this.nodes) this.nodes = {};
		if(!this.nodes[i]) this.nodes[i] = new Node(this.lumps, this, i);
		return this.nodes[i];
	}
	getSubsector(i)
	{
		if(!this.subsectors) this.subsectors = {};
		if(!this.subsectors[i]) this.subsectors[i] = new Subsector(this.lumps, this, i);
		return this.subsectors[i];
	}
	getSeg(i)
	{
		if(!this.segs) this.segs = {};
		if(!this.segs[i]) this.segs[i] = new Seg(this.lumps, this, i);
		return this.segs[i];
	}
	getVertex(i)
	{
		if(!this.vertexes) this.vertexes = {};
		if(!this.vertexes[i]) this.vertexes[i] = new Vertex(this.lumps, this, i);
		return this.vertexes[i];
	}
	getLinedef(i)
	{
		if(!this.linedefs) this.linedefs = {};
		if(!this.linedefs[i]) this.linedefs[i] = new Linedef(this.lumps, this, i);
		return this.linedefs[i];
	}
	getSidedef(i)
	{
		if(!this.sidedefs) this.sidedefs = {};
		if(!this.sidedefs[i]) this.sidedefs[i] = new Sidedef(this.lumps, this, i);
		return this.sidedefs[i];
	}
	getSector(i)
	{
		if(!this.sectors) this.sectors = {};
		if(!this.sectors[i]) this.sectors[i] = new Sector(this.lumps, this, i);
		return this.sectors[i];
	}

	initializeLumps()
	{
		this.lumps = {};
		this.lumps.things = wad.getFirstLumpAfter("THINGS", this.name);
		this.lumps.linedefs = wad.getFirstLumpAfter("LINEDEFS", this.name);
		this.lumps.sidedefs = wad.getFirstLumpAfter("SIDEDEFS", this.name);
		this.lumps.vertexes = wad.getFirstLumpAfter("VERTEXES", this.name);
		this.lumps.segs = wad.getFirstLumpAfter("SEGS", this.name);
		this.lumps.ssectors = wad.getFirstLumpAfter("SSECTORS", this.name);
		this.lumps.nodes = wad.getFirstLumpAfter("NODES", this.name);
		this.lumps.sectors = wad.getFirstLumpAfter("SECTORS", this.name);
		this.lumps.reject = wad.getFirstLumpAfter("REJECT", this.name);
		this.lumps.blockmap = wad.getFirstLumpAfter("BLOCKMAP", this.name);
	}
}