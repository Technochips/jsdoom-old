var random = {};

random.rndtable = [0,8,109,220,222,241,149,107,75,248,254,140,16,66,
random.rndindex = 0;
random.prndindex = 0;

function P_Random()
{
	random.prndindex++;
	if(random.prndindex > 0xff)
		random.prndindex = 0;
	return random.rndtable[random.prndindex];
}
function M_Random()
{
	random.rndindex++;
	if(random.rndindex > 0xff)
		random.rndindex = 0;
	return random.rndtable[random.rndindex];
}
function M_ClearRandom()
{
	rndindex = 0;
	prndindex = 0;
}