function shiftString(str='', step = 0)
{
	const length = str.length;
	step = step % length;
	step = step < 0 ? length + step : step;
	if (!str || length === 1 || !step) {
		return str;
	}
	const reverseString = (str) => str.split('').reverse().join('');
	str = reverseString(str);
	const s1 = str.slice(0, step);
	const s2 = str.slice(step);
	return reverseString(s1) + reverseString(s2);
};
function lerp (start, end, amt)
{
	return (1-amt)*start+amt*end
}
function distance(x0,y0,x1,y1)
{
	return Math.sqrt(Math.pow(x1-x0,2) + Math.pow(y1-y0,2));
}