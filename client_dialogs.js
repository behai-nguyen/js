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

function displayWarning( xhr, error, errorThrown ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'For your info...',
	   bodyText: `<span>Please contact support with message <strong>${errorThrown}</strong>.</span>`,
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

function parsleyValidationError( errorInHtml ) {
	var dialog = new GenericDialog( {
	   dialogId: '#popupDialog',
	   title: 'Please enter valid data',
	   bodyText: errorInHtml } );

	dialog.open();
};