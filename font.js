var hu_font = [];

var HU_FONTSTART = 33;
var HU_FONTEND = 95;

for(var x = HU_FONTSTART; x < HU_FONTEND; x++)
{
	hu_font[String.fromCharCode(x)] = "STCFN" + String(x).padStart(3, '0');
}