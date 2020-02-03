var sound = {};
sound.audioContext = new (window.AudioContext || window.webkitAudioContext)();
sound.sounds = [];

class Sound
{
	lump;

	format;
	sampleRate;
	sampleCount;

	audioBuffer;
	constructor(lump)
	{
		this.lump = lump;
		this.format = lump.lumpDataView.getUint16(0, true);
		this.sampleRate = lump.lumpDataView.getUint16(2, true);
		this.sampleCount = lump.lumpDataView.getUint16(4, true)-32;

		this.audioBuffer = sound.audioContext.createBuffer(1, this.sampleCount, this.sampleRate)

		var buffer = this.audioBuffer.getChannelData(0);
		for(var i = 0; i < this.sampleCount; i++)
		{
			buffer[i] = (this.lump.lumpDataView.getUint8(i+0x18)-(127.5))/(127.5); //0 - 255 to -1 - 1
		}
	}
}

sound.playSound = function(filename)
{
	var file = "DS" + filename;
	if(!sound.sounds[file])
	{
		var l = wad.getFirstLump(file);
		if(!l) return;
		sound.sounds[file] = new Sound(l);
	}

	var node = sound.audioContext.createBufferSource();
	node.buffer = sound.sounds[file].audioBuffer;
	node.connect(sound.audioContext.destination);
	node.start();
	return node;
}