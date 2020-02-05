class Level
{
	name;

	nodes;
	constructor(name)
	{
		this.name = name;
		this.nodes = new Nodes(wad.getFirstLumpAfter("NODES", name));
	}
}