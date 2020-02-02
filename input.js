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

input.ticinput = new TicInput(0, 0, 0, false, false, false, false);

input.onKeyDown = function(e)
{
	input.inputs[e.code] = true;
}
input.onKeyUp = function(e)
{
	input.inputs[e.code] = false;
}