/*
    Date Created: 17/03/2022.
*/

/*
Extracts and returns day, month and year as integers from a
date string based on a date format and a date separator.

Arguments:

dateFmt: date format. E.g. "dd/mm/yyyy", "yyyy-mm-dd". Where:

    -- dd: day.
    -- mm: month.
    -- yyyy: year.

dateSep: depends on dateFmt. If:

    -- dd/mm/yyyy: dateSep is "/".
    -- yyyy-mm-dd: dateSep is "-".

dateStr: the date string whose components to be determined.

Return:

{ "valid": false/true, "day": -1/99, "month": -1/99, "year": -1/9999 };

When "valid" is true -- "day", "month" and "year" are valid integers;
only valid integers, not necessary a valid date.

That is, dateStr is not a necessary valid date.

When "valid" is false -- "day", "month" and "year" is/are not valid
integers; one or more than one is -1.

For example:
    dateFmt = 'dd/mm/yyyy', dateSep = '/', dateStr = '2/4/2022'
    { "valid": true, "day": 2, "month": 4, "year": 2022 }

    dateFmt = 'dd/xx/yyyy', dateSep = '/', dateStr = '2/4/2022'
    { "valid": false, "day": 2, "month": -1, "year": 2022 }
*/
function getDateComponents( dateFmt, dateSep, dateStr ) {

	function getAComponent( fmtTokens, dateTokens, component ) {
		let intRegEx = /^ *[0-9]+ *$/;

		let idx = fmtTokens.indexOf( component );
		if ( idx == -1 ) return [ false, -1 ];
		if ( !intRegEx.test(dateTokens[idx]) ) return [ false, -1 ];

		return [ true, parseInt(dateTokens[idx], 10) ];
	};

	function doGetDateComponents() {
		let fmtTokens = dateFmt.toLowerCase().split( dateSep );
		let dateTokens = dateStr.split( dateSep );

		let res = { "valid": false, "day": -1, "month": -1, "year": -1 };

		[ res.valid, res.day ] = getAComponent( fmtTokens, dateTokens, 'dd' );

		if ( res.valid )
			[ res.valid, res.month ] = getAComponent( fmtTokens, dateTokens, 'mm' );

		if ( res.valid )
			[ res.valid, res.year ] = getAComponent( fmtTokens, dateTokens, 'yyyy' );

		return res;
	};

	return doGetDateComponents;
};

/*
Ensures integers day, month and year represent a valid date.

Arguments:

day, month, year: integers.
Where the month of Januaray is 1.

Return:

True if represent a valid date. False otherwise.
*/
function validateDateByComponents1( day, month, year ) {

	function isLeapYear( year )
	{
		return ( year % 4 == 0 && year % 4000 != 0 ) &&
			   ( year % 100 != 0 || year % 400 == 0 );
	};

	function daysInMonth( month, year )
	{
		const MONTH_DAY = [ {m: 1, d: 31}, {m: 3, d: 31}, {m: 5, d: 31},
			{m: 7, d: 31}, {m: 8, d: 31}, {m: 10, d: 31}, {m: 12, d: 31},
			{m: 4, d: 30}, {m: 6, d: 30}, {m: 9, d: 30}, {m: 11, d: 30} ];

		if ( month == 2 )
			return isLeapYear(year) ? 29 : 28

		else {
			const res = MONTH_DAY.find( ({ m }) => m === month );
			return ( typeof(res) === 'undefined' ) ? 0 : res.d;
		};
	};

	function doValidateDateByComponents() {
		if ( month < 1 || month > 12 ) return false;

		return ( day < 1 || day > daysInMonth(month, year) ) ? false : true;
	};

	return doValidateDateByComponents;
};

/*
Ensures { "valid": Boolean, "day": Integer, "month": Integer, "year": Integer }
represents a valid date.

Arguments:

dates: { "valid": Boolean, "day": Integer, "month": Integer, "year": Integer }
-- This is result of function getDateComponents( dateFmt, dateSep, dateStr )()

Return:

True if dates represents a valid date. False otherwise.
*/
function validateDateByComponents2( dates ) {

	function doValidateDateByComponents() {

		if ( !dates.valid ) return false;
		return validateDateByComponents1( dates.day, dates.month, dates.year )();
	};

	return doValidateDateByComponents;
};

/*
Validates a date input based a given date format and a date separator.

Validation includes:

    1. Day, month and year are valid integer. Leading 0s are not required
       for single digit day and month.

    2. Format obey a specified format.

    3. Number of days must be valid for the given month.

    4. For the month of February, checks also for leap year and non-leap year.

Arguments:

dateFmt: date format. E.g. "dd/mm/yyyy", "yyyy-mm-dd". Where:

    -- dd: day. Valid values are 1 to 31, depends on year,
           month. Leading 0 is not required.
    -- mm: month. Valid values are 1 to 12. Leading 0 is not
           required.
    -- yyyy: year. Valid values are all digits.

dateSep: depends on dateFmt. If:

    -- dd/mm/yyyy: dateSep must be "/".
    -- yyyy-mm-dd: dateSep must be "-".

dateStr: the date string to be validated. Format must match dateFmt.

Return:

True -- if dateStr represents a valid date.
False -- if dateStr represents an invalid date.
*/
function validateDate( dateFmt, dateSep, dateStr ) {

	function doValidate() {

		let dates = getDateComponents( dateFmt, dateSep, dateStr )();

		return validateDateByComponents2( dates )();
	};

	return doValidate;
};

/*
Start Date and End Date represent are in string format.
Checks if End Date is on or after Start Date.

Arguments:

dateFmt, dateSep, startDateStr, endDateStr:

See function validateDate( dateFmt, dateSep, dateStr )'s.

Return:

True -- if End Date is on or after Start Date.
False -- otherwise.
*/
function startDateOnOrAfterEndDate( dateFmt, dateSep, startDateStr, endDateStr ) {

	function doValidate() {

		let startDates = getDateComponents( dateFmt, dateSep, startDateStr )();
		if ( !validateDateByComponents2( startDates )() ) return false;

		let endDates = getDateComponents( dateFmt, dateSep, endDateStr )();
		if ( !validateDateByComponents2( endDates )() ) return false;

		let startDate = new Date( startDates.year, startDates.month-1, startDates.day );
		let endDate = new Date( endDates.year, endDates.month-1, endDates.day );

		return endDate >= startDate;
	};

	return doValidate;
}

/*
Generates list of dates between startDateStr and endDateStr
inclusively. Each date is in format "dd/mm/yyyy" with leading
0 for single digit days and months.

Arguments:

startDateStr, endDateStr: in format "dd/mm/yyyy".

Return:

An array of dates between startDateStr and endDateStr inclusively,
in format "dd/mm/yyyy", if:

    1. startDateStr and endDateStr are valid dates.
    2. and endDateStr is on and after startDateStr.

An array empty otherwise.
*/
function generatePeriodDates( startDateStr, endDateStr )
{
	let res = [];

	let dates1 = getDateComponents( 'dd/mm/yyyy', '/', startDateStr )();
	if ( !validateDateByComponents2(dates1)() ) return res;

	let dates2 = getDateComponents( 'dd/mm/yyyy', '/', endDateStr )();
	if ( !validateDateByComponents2(dates2)() ) return res;

	let dtObj1 = new Date( dates1.year, dates1.month-1, dates1.day );
	let dtObj2 = new Date( dates2.year, dates2.month-1, dates2.day );

	while ( dtObj1 <= dtObj2 ) {
		res.push(
			dtObj1.toLocaleDateString(undefined, {day:'2-digit'})
				+ '/' + dtObj1.toLocaleDateString(undefined, {month:'2-digit'})
				+ '/' + dtObj1.toLocaleDateString(undefined, {year:'numeric'})
		);
		dtObj1.setDate( dtObj1.getDate() + 1 );
	};

	return res;
};

/*
Gets the day of week, Sunday to Saturday, for the date 
represented by dateStr.

Arguments:

dateStr: in format "dd/mm/yyyy".

Return:

'Sunday' to 'Saturday' -- 
*/
function dayOfWeek( dateStr ) {
	let dates = getDateComponents( 'dd/mm/yyyy', '/', dateStr )();
	if ( !validateDateByComponents2(dates)() ) return '';

	let date = new Date( dates.year, dates.month-1, dates.day );
	return date.toLocaleDateString( undefined, {weekday: 'long'} );
};

/*
    If Parsley validation is in used.
*/
if ( typeof(window.Parsley) != 'undefined' ) {
    window.Parsley.addValidator( 'ausDate', {

		validateString: ( value ) => {
			return validateDate( 'dd/mm/yyyy', '/', value )();
		},

		messages: {
			en: 'Date is in format dd/mm/yyyy. E.g. 25/2/1999.',
			vi: 'Vui lòng viết theo dạng dd/mm/yyyy. Thí dụ: 25/2/1999.'
		}
	});
};