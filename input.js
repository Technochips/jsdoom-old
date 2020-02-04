class TicInput
{
	forward;
	strafing;
	angleturn;

	fire;
	use;
	pause;
	savedOn;

	weapon;
	constructor(forward, strafing, angleturn, fire, use, pause, savedOn, weapon)
	{
		this.forward = forward;
		this.strafing = strafing;
		this.angleturn = angleturn;
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

input.speeds = {};
input.speeds.forwardMove = [0x19, 0x32];
input.speeds.sideMove = [0x18, 0x28];
input.speeds.angleturn = [640, 1280, 320];
input.speeds.maxplmove = input.speeds.forwardMove[1];

input.turnheld = 0;
input.slowturntics = 6;

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
	var speed = (this.gameKeysPressed.run || this.autorun) ? 1 : 0;

	this.ticinput[player].forward = 0;
	this.ticinput[player].strafing = 0;
	this.ticinput[player].angleturn = 0;

	if(this.gameKeysPressed.left || this.gameKeysPressed.right)
		this.turnheld++;
	else
		this.turnheld = 0;
	
	var tspeed = (this.turnheld < this.slowturntics) ? 2 : speed;
	if(this.gameKeysPressed.strafe)
	{
		if(this.gameKeysPressed.right)
			this.ticinput[player].strafing += this.speeds.sideMove[speed];
		if(this.gameKeysPressed.left)
			this.ticinput[player].strafing -= this.speeds.sideMove[speed];
	}
	else
	{
		if(this.gameKeysPressed.right)
			this.ticinput[player].angleturn -= this.speeds.angleturn[tspeed];
		if(this.gameKeysPressed.left)
			this.ticinput[player].angleturn += this.speeds.angleturn[tspeed];
	}

	if(this.gameKeysPressed.forward)
		this.ticinput[player].forward += this.speeds.forwardMove[speed];
	if(this.gameKeysPressed.backward)
		this.ticinput[player].forward -= this.speeds.forwardMove[speed];
	
	if(this.gameKeysPressed.straferight)
		this.ticinput[player].strafing += this.speeds.sideMove[speed];
	if(this.gameKeysPressed.strafeleft)
		this.ticinput[player].strafing -= this.speeds.sideMove[speed];
	
	this.ticinput[player].fire = this.gameKeysPressed.fire;
	this.ticinput[player].use = this.gameKeysPressed.use;
	this.ticinput[player].pause = this.keysPressed["Pause"];

	this.ticinput[player].weapon = 0;
	for(var i = 1; i <= 7; i++)
	{
		if(this.keysDown["Digit" + i])
		{
			this.ticinput[player].weapon = i;
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