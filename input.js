class TicInput
{
	vertical;
	strafing;
	turning;

	fire;
	use;
	pause;
	savedOn;

	weapon;
	constructor(vertical, strafing, turning, fire, use, pause, savedOn, weapon)
	{
		this.vertical = vertical;
		this.strafing = strafing;
		this.turning = turning;
		this.fire = fire;
		this.use = use;
		this.pause = pause;
		this.savedOn = savedOn;
		this.weapon = weapon;
	}
}

var input = {};
input.gameKeys = [];

input.keysPressed = [];
input.keysDown = [];
input.gameKeysPressed = [];
input.gameKeysDown = [];

input.autorun = false;

input.gameKeyReset = function()
{
	input.gameKeys = 
	{
		forward: "KeyW",
		backward: "KeyS",
		left: "ArrowLeft",
		right: "ArrowRight",
		strafeleft: "KeyA",
		straferight: "KeyD",
		run: "ShiftLeft",
		strafe: "AltLeft",
		fire: "ControlLeft",
		use: "Space"
	}
}
input.gameKeyReset();

input.ticinput = [];
input.resetTicinput = function()
{
	input.ticinput =
	[
		new TicInput(0, 0, 0, false, false, false, 0, 0),
		new TicInput(0, 0, 0, false, false, false, 0, 0),
		new TicInput(0, 0, 0, false, false, false, 0, 0),
		new TicInput(0, 0, 0, false, false, false, 0, 0)
	];
}
input.resetTicinput();

input.setTicinputFromGameInput = function(player)
{
	var running = this.gameKeysPressed.run || input.autorun;

	if(this.gameKeysPressed.forward && !this.gameKeysPressed.backward)
		input.ticinput[player].vertical = running ? 50 : 24;
	else if(!this.gameKeysPressed.forward && this.gameKeysPressed.backward)
		input.ticinput[player].vertical = running ? -50 : -24;
	else
		input.ticinput[player].vertical = 0;
	
	if(this.gameKeysPressed.straferight && !this.gameKeysPressed.strafeleft)
		input.ticinput[player].strafing = running ? 40 : 24;
	else if(!this.gameKeysPressed.straferight && this.gameKeysPressed.strafeleft)
		input.ticinput[player].strafing = running ? -40 : -24;
	else
		input.ticinput[player].strafing = 0;
	
	input.ticinput[player].fire = this.gameKeysPressed.fire;
	input.ticinput[player].use = this.gameKeysPressed.use;
	input.ticinput[player].pause = this.keysPressed["Pause"];

	input.ticinput[player].weapon = 0;
	for(var i = 1; i <= 7; i++)
	{
		if(this.keysDown["Digit" + i])
		{
			input.ticinput[player].weapon = i;
			break;
		}
	}
}

input.removeKeysDown = function()
{
	for(var i in input.keysDown)
	{
		input.keysDown[i] = false;
	}
	for(var i in input.gameKeysDown)
	{
		input.gameKeysDown[i] = false;
	}
}
input.hasKeyPressed = function()
{
	for(var i in input.keysDown) if(input.keysDown[i]) return input.keysDown[i];
	return false;
}
input.firstKeyDown = function()
{
	for(var i in input.keysDown) if(input.keysDown[i]) return i;
}

input.onKeyDown = function(e)
{
	if(!input.keysPressed[e.code])
	{
		input.keysPressed[e.code] = true;
		input.keysDown[e.code] = true;
		for(var k in input.gameKeys)
		{
			if(input.gameKeys[k] == e.code)
			{
				input.gameKeysPressed[k] = true;
				input.gameKeysDown[k] = true;
			}
		}
	}
}
input.onKeyUp = function(e)
{
	input.keysPressed[e.code] = false;
	for(var k in input.gameKeys)
	{
		if(input.gameKeys[k] == e.code)
		{
			input.gameKeysPressed[k] = false;
		}
	}
}