/*
Date Created: 15/02/2023.

Full screen dialogs to display formatted JSON data, and free text data.

They are strictly read-only dialog.

Assumption: the calling HTML page has this full screen Bootstrap dialog 
    HTML fraqment defined.

    <div class="modal fade" id="modalDialog" tabindex="-1" aria-labelledby="dialogTitle" aria-hidden="true">
	    <div class="modal-dialog modal-fullscreen">
	        <div class="modal-content">
		        <div class="modal-header">
		            <h5 class="modal-title" id="dialogTitle">Modal title</h5>
		            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		        </div>

		        <div class="modal-body" id="dialogBody">
		            <!----->
		        </div>

		        <div class="modal-footer">
		            <button type="button" class="btn btn-primary" xxxdata-bs-dismiss="modal">Close</button>
		        </div>
	        </div>
	    </div>
    </div>

Properties / Options:

#dialogSelector: jQuery-style selector which identifies the Bootstrap
    modal dialog.

#dialog, #dialogBody, #modal: internal working variables.

#dialogData: data to be rendered and displayed by the dialog. Data is 
    either JSON or free text.

#params: array of dialog properties:
    1. First element is dialog title.
	
Dependencies:

1. JQuery.
2. Bootstrap suite.
3. https://abodelot.github.io/jquery.json-viewer
*/

class FullScreenDialog {
    #dialogSelector = '#modalDialog';
    #dialog = null;
    dialogBody = null;
    #modal = null;
    dialogData = null;	
	#params = null;

    constructor( options ) {
        this.dialogData = options.data;
        this.#params = options.params;
	}
	
    initialise() {
        this.#dialog = $( this.#dialogSelector );
        this.dialogBody = $( '#dialogBody', this.#dialog );

        this.#modal = new bootstrap.Modal( this.#dialogSelector );

        $( '#dialogTitle', this.#dialog ).text( this.#params[0] );
    }

	bindCloseDialog() {
		$( '.modal-header.btn-close, button.btn-primary', this.#dialog ).on( 'click', () => {
			this.#modal.hide();
		});
	}
	
    parseAndDisplay() { this.dialogBody.empty(); }

	open() {
	    this.initialise();
		this.bindCloseDialog();

		this.parseAndDisplay();

		this.#modal.show();
	}	
	
	echoProperties() {
	    return [ this.#dialogSelector, this.#params[0], this.dialogData ];
	}
}

class JSONViewerDialog extends FullScreenDialog {
	parseAndDisplay() {
        super.parseAndDisplay();
	
		var options = {
		  collapsed: false,
		  rootCollapsable: false,
		  withQuotes: false,
		  withLinks: true
		};
		this.dialogBody.jsonViewer(this.dialogData, options);
	}	
}

/*
    this.dialogData: should be HTML ready.
*/
class TextViewerDialog extends FullScreenDialog {
	parseAndDisplay() {
        super.parseAndDisplay();
		
        this.dialogBody.html( $('<div class="p-3">' + this.dialogData + '</div>') );
	}
}

function jsonViewerDialog( jsonData, params ) {
	var dialog = new JSONViewerDialog({
	    data: jsonData,
	    params: params });

	dialog.open();
}

/*
    text: server returns as HTML ready. No need to call:
        - replace(/\n/g, '<br/>')
        - replace(/\s+/g, '&nbsp;')
*/
function textViewerDialog( text, params ) {	
	var dialog = new TextViewerDialog({
	    data: text,
	    params: params });

	dialog.open();
};
