class TicInput
{
	vertical;
	strafing;
	turning;

	fire;
	use;
	weapon;
	specialMode;
	constructor(vertical, strafing, turning, fire, use, weapon, specialMode)
	{
		this.vertical = vertical;
		this.strafing = strafing;
		this.turning = turning;
		this.fire = fire;
		this.use = use;
		this.weapon = weapon;
		this.specialMode = specialMode;
	}
}

var input = {};
input.inputs = [];
input.firstInputs = [];

input.ticinput = new TicInput(0, 0, 0, false, false, false, false);

input.removeFirstInputs = function()
{
	for(var i in input.firstInputs)
	{
		input.firstInputs[i] = false;
	}
}
input.hasKeyPressed = function()
{
	for(var i in input.firstInputs) if(input.firstInputs[i]) return input.firstInputs[i];
}
input.firstKeyPressed = function()
{
	for(var i in input.firstInputs) if(input.firstInputs[i]) return i;
}

input.onKeyDown = function(e)
{
	if(!input.inputs[e.code])
	{
		input.inputs[e.code] = true;
		input.firstInputs[e.code] = true;
	}
}
input.onKeyUp = function(e)
{
	input.inputs[e.code] = false;
}