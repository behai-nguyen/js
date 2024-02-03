/*
Date Created: 11/04/2023.

Caller dependencies:

1. jQuery.
2. Optional D:\Codes\WebWork\js\content_types.js.
*/

/*
Date Created: 11/04/2023.

Run an AJAX request and return a Promise object.

Caller dependencies:

1. jQuery.
2. Optional D:\Codes\WebWork\js\content_types.js.

method: get or post.

endPoint: URL to get from and post to.

requestHeaders: an object of name-value pairs of custom headers.
    E.g. { 'X-CSRFToken': '{{ csrf_token() }}' }

         for Cross Site Request Forgery ( CSRF ) to validate request origin.

contentType: media types / content types. Defined in
    D:\Codes\WebWork\js\content_types.js.

ajaxData: data to be sent with the AJAX call.

Promise.resolve() and Promise.reject() take an object which is a
bundle of all params returned by AJAX success( status, textStatus, jqXHR )
and error( xhr, error, errorThrown ) -- in a name-value pair format.

Usage example:

    runAjaxEx( 'get',
               '/my-end-point',
               { 'X-CSRFToken': '{{ csrf_token() }}' },
			   X_WWW_FORM_URLENCODED_UTF8,
			   $('#myForm').serialize() ).
	    then( function( data ) {
            let { status, textStatus, jqXHR } = data;

            //...use status, textStatus, jqXHR...
        }).
        catch( function( data ) {
            let { xhr, error, errorThrown } = data;

            //...use xhr, error, errorThrown...
        });

    X_WWW_FORM_URLENCODED_UTF8 is 'application/x-www-form-urlencoded; charset=UTF-8'.
	    defined in D:\Codes\WebWork\js\content_types.js.
*/
function runAjaxEx( method, endPoint, requestHeaders, contentType, ajaxData ) {

	$( '.selector-loading' ).removeClass( 'd-none' );

	return new Promise( (resolve, reject) => {
		$.ajax({
			type: method,
			url: endPoint,

            headers: requestHeaders,

			contentType: contentType,
			data: ajaxData,

			success: function( status, textStatus, jqXHR ) {
                resolve( {'status': status, 'textStatus': textStatus, 'jqXHR': jqXHR} );

				$( '.selector-loading' ).addClass( 'd-none' );
			},

			error: function( xhr, error, errorThrown ) {
				reject( {'xhr': xhr, 'error': error, 'errorThrown': errorThrown} );

				$( '.selector-loading' ).addClass( 'd-none' );
			}
		});
    });
};

/*
Date Created: Late/01/2024.

Exactly as runAjaxEx(...) with cross-domain enabled:

*/
function runAjaxCrossDomain( method, endPoint, requestHeaders, contentType, ajaxData ) {

	$( '.selector-loading' ).removeClass( 'd-none' );

	return new Promise( (resolve, reject) => {
		$.ajax({
			type: method,
			url: endPoint,

            headers: requestHeaders,

			contentType: contentType,
			data: ajaxData,

            // Cross domain.
            // https://stackoverflow.com/questions/76956593/how-to-persist-data-across-routes-using-actix-session-and-redisactorsessionstore
			xhrFields: {
			   withCredentials: true
			},
			crossDomain: true,

			success: function( status, textStatus, jqXHR ) {
                resolve( {'status': status, 'textStatus': textStatus, 'jqXHR': jqXHR} );

				$( '.selector-loading' ).addClass( 'd-none' );
			},

			error: function( xhr, error, errorThrown ) {
				reject( {'xhr': xhr, 'error': error, 'errorThrown': errorThrown} );

				$( '.selector-loading' ).addClass( 'd-none' );
			}
		});
    });
};
