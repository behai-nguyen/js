/*
Date Created: 28/09/2022.

Setting element ( div ) height to enable vertical scrollbar.
The main function is:

    function setElementHeight( elemSelector, containerElem, siblingIds, cssStyles )

Implementation uses only vanilla JavaScript, does not require 
any third party library.
*/

/*
Converts rem to to pixels.

Reference: https://stackoverflow.com/questions/36532307/rem-px-in-javascript
           rem px in Javascript
*/
function convertRemToPixels( rem ) {
    return rem * parseFloat( getComputedStyle(document.documentElement).fontSize );
};

/*
Add and return all margin tops and margin bottoms for a
set of CSSes. The final result is in pixel.

Arguments:

cssStyles: array of CSSes whose margin tops and margin
bottoms are to be added, CSSes should be qualified with
tag name, i.e.: div.mb-2; .mb-2 will not work. E.g.:

    [ 'div.mb-2' ]

Return: a float which is the total number of pixels.
*/
function getVerticalMargins( cssStyles ) {
    var total = 0;
    cssStyles.forEach( ( css ) => {
        var style = getComputedStyle( document.querySelector(css) );
        total += parseFloat( style.marginTop ) + parseFloat( style.marginBottom );
    });

    return total;
};

/*
Calculate the height of an element by taking away the heights of
other relevant elements, and the relevant total margins tops and
bottoms.

Arguments:

containerElem: a JavaScript object. passing in null to use document.body.

siblingIds: Ids of element whose heights are to be taken away from
containerElem's. E.g.:

    [ 'header', 'footer', 'form-info-text' ]

cssStyles: see function getVerticalMargins( cssStyles ).
*/
function calcElementHeight( containerElem, siblingIds, cssStyles ) {
	var height = containerElem != null ?
        containerElem.scrollHeight: document.body.scrollHeight;

	siblingIds.forEach( (id) => height -= document.getElementById(id).clientHeight );

	return height - getVerticalMargins( cssStyles );
};

/*
Calculate and set the height for an element.

Arguments:

elemSelector: selector identifies target element. Note, this is a
selector, not an Id. E.g.:

    'div.selector-output-area'

containerElem, siblingIds, cssStyles: see
    function calcElementHeight( containerElem, siblingIds, cssStyles ).
	
Example usage:

setElementHeight( 'div.selector-output-area', null,
	[ 'header', 'footer', 'form-info-text', 'form-header' ], [ 'div.mb-2' ] );	
*/
function setElementHeight( elemSelector, containerElem, siblingIds, cssStyles ) {
    var height = calcElementHeight( containerElem, siblingIds, cssStyles );
    document.querySelector( elemSelector ).style.height = `${height}px`;
};