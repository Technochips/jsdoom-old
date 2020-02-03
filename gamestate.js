var gamestate = "title";
var gamestates = [];
var onTitle = true;

function changeState(state, isTitle, ...args)
{
	if(gamestates[state])
	{
		gamestate = state;
		gamestates[state].changedTo(...args);
		wipe.startWiping();
		console.log("Switching to state \"" + state + "\"");
		onTitle = isTitle;
	}
}