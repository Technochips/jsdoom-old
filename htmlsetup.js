function htmlToggleConfig(id, hide)
{
	document.getElementById(id + (!hide ? "" : "-closed")).classList.add("hidden");
	document.getElementById(id + (hide ? "" : "-closed")).classList.remove("hidden");
}

var whichInput;
var element;

function setupKey(i, e)
{
	whichInput = i;

	element = e;
	e.textContent = "Press a key...";

	window.addEventListener("keydown", setKey, true);
}

function setKey(e)
{
	if(element || whichInput)
	{
		element.textContent = e.code;
		input.gameKeys[whichInput] = e.code;
		element = null;
		whichInput = null;
	}
}