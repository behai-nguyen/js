/*
Date Created: 03/03/2023.
	
Dependencies:

1. D:\Codes\WebWork\js\locale_funcs.js	
*/

/**
 * Format a decimal number with thousand separator and decimal places.
 *
 * References: 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
 *
 * @param {Numeric} value to be format.
 *
 * @param {decPoint} decimal point.
 *
 * @returns {String}
 */
function formatNumber( value, decPoint ) {
	return parseFloat(value).toLocaleString( currentLocale(), 
        { minimumFractionDigits: decPoint, maximumFractionDigits: decPoint }
	);
}

//TO_DO:
function currencyCode() { return 'AUD'; }

function formatCurrency2( value ) {
	return parseFloat(value).toLocaleString( currentLocale(), 
        { minimumFractionDigits: 2, maximumFractionDigits: 2,
		  style: 'currency', currency: currencyCode() }
	).substr(1);
}

function formatCurrency4( value ) {
	return parseFloat(value).toLocaleString( currentLocale(), 
        { minimumFractionDigits: 4, maximumFractionDigits: 4,
		  style: 'currency', currency: currencyCode() }
	).substr(1);
}
