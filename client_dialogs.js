/*
    Date Created: 04/04/2022.
	
    Generic dialogs which can be called from HTML pages.
	
    Required "bootstrap_dialogs.js".	
*/

function displayError( xhr, error, errorThrown ) {
	var dialog = new GenericDialog( { 
	   dialogId: '#popupDialog', 
	   title: 'Oops something\' happened...',
	   message: `<span>Please contact support with message <strong>${errorThrown}</strong>.</span>` } );
	   
	dialog.open();
};

function displayError1( errorThrown ) {
	var dialog = new GenericDialog( { 
	   dialogId: '#popupDialog', 
	   title: 'For your info...',
	   message: `<span><strong>${errorThrown}</strong>.</span>` } );
	   
	dialog.open();
};

function displayWarning( xhr, error, errorThrown ) {
	var dialog = new GenericDialog( { 
	   dialogId: '#popupDialog', 
	   title: 'For your info...', 
	   message: `<span>Please contact support with message <strong>${errorThrown}</strong>.</span>`, 
	   buttonClass: 'btn-warning' } );
	   
	dialog.open();	
};

function displayInfo( msg ) {
	var dialog = new GenericDialog( { 
	   dialogId: '#popupDialog', 
	   title: 'For your info...',
	   message: `<span>${msg}</span>`,
	   buttonClass: 'btn-info' } );
	   
	dialog.open();				   
};

function parsleyValidationError( errorInHtml ) {
	var dialog = new GenericDialog( { 
	   dialogId: '#popupDialog', 
	   title: 'Please enter valid data', 
	   message: errorInHtml } );
	   
	dialog.open();				   
};