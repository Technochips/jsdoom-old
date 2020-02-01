var gamestate = "title"
var gamestates = []

function changeState(state, ...args)
{
	if(gamestates[state])
	{
		gamestate = state;
		gamestates[state].changedTo(...args);
		wipe.startWiping();
		console.log("Switching to state \"" + state + "\"");
	}
}