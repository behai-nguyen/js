/*
Date Created: 01/06/2023.

Some CSS related functions.
*/

/*
Gets an element border widths.

Reference:    
    https://stackoverflow.com/questions/14681002/get-border-width-from-a-div-with-plain-javascript
	Get border width from a div with plain javascript
	
    https://stackoverflow.com/a/50759922
	Based on the answer by Gryso, 08/06/2018.
	
Arguments:

elem: the element whose border widths are to be retrieved.	
*/
function getBorderWidths( elem ) {
	var r = {'t': 0, 'r': 0, 'b': 0, 'l': 0};
    r.t = parseFloat( getComputedStyle(elem).borderTopWidth.slice(0, -2), 10 ),
    r.r = parseFloat( getComputedStyle(elem).borderRightWidth.slice(0, -2), 10 ),
    r.b = parseFloat( getComputedStyle(elem).borderBottomWidth.slice(0, -2), 10 ),
    r.l = parseFloat( getComputedStyle(elem).borderLeftWidth.slice(0, -2), 10 );

	return r;
}
