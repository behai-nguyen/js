/*
Generic dialogs which can be called from HTML pages.

Dependencies:

1. D:\Codes\WebWork\js\bootstrap_dialogs.js
*/

function displayError( xhr, error, errorThrown ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'Oops something\' happened...',
	   bodyText: `<span>Please contact support with message <strong>${errorThrown}</strong>.</span>` } );

	dialog.open();
};

function displayError1( errorThrown ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'For your info...',
	   bodyText: `<span><strong>${errorThrown}</strong>.</span>` } );

	dialog.open();
};

function displayError2( htmlErrorText ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'For your info...',
	   bodyText: htmlErrorText } );

	dialog.open();
};

function displayWarning( xhr, error, errorThrown ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'For your info...',
	   bodyText: `<span>Please contact support with message <strong>${errorThrown}</strong>.</span>`,
	   buttonClass: 'btn-warning' } );

	dialog.open();
};

function displayWarning1( status ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'For your info...',
	   bodyText: '<span>Please contact support:</span>' +
	             '<ul>' +
				 `<li>Message: <strong>${status.text}</strong></li>` +
				 `<li>Id: <strong>${status.session_id}</strong></li>` +				 
				 '</ul>',
	   buttonClass: 'btn-warning' } );

	dialog.open();
};

function displayInfo( msg ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'For your info...',
	   bodyText: `<span>${msg}</span>`,
	   buttonClass: 'btn-info' } );

	dialog.open();
};
