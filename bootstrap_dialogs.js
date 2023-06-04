/*
A parent-most generic dynamic Bootstrap 5.0 popup dialog.

The dialog HTML is created dynamically and gets removed
after finished closing.

Properties / Options:

#htmlTemplate: custom HTML body to be provided by caller.

#dialogId: this instance unique DOM Id.

#title: dialog title.

#bodyText: actual body text to be displayed inside dialog body.

          This is HTML: text must be wrapped inside a HTML tag, e.g.:

			<span>Please contact <strong>Support</strong>...</span>

Dependencies:

1. JQuery.
2. D:\Codes\WebWork\js\drags.js
3. D:\Codes\WebWork\js\wait_util.js
*/
class Dialog {
    #htmlTemplate = '';
	#dialogId = '';
    #plainId = '';
	#title = '';
	#setBodyText = true;
	#bodyText = '';

	#dialog = null;
	#modal = null;

    #shown = false;

	//
	// options.dialogId -- should already have '#' in front.
	//
    constructor( options ) {
        this.#dialogId = options.dialogId;
        this.#plainId = this.#dialogId.substring( 1 );
        this.#title = options.title;
		
        if ( options.hasOwnProperty('setBodyText') )
            this.#setBodyText = options.setBodyText;
		
        this.#bodyText = options.bodyText;
	}

	initialise() {
        // console.log( `this.#dialogId ${this.#dialogId}` );
        // console.log( `this.#plainId ${this.#plainId}` );

		// Should not exist, but just in case.
		$( this.#dialogId ).remove();

		$( 'body' ).append( $(this.#htmlTemplate) );

		this.#dialog = $( this.#dialogId );
		this.#modal = new bootstrap.Modal( document.getElementById(this.#plainId) );

		$( '.modal-title', this.#dialog ).text( this.#title );
		if ( this.#setBodyText )
		    $( '.modal-body', this.#dialog ).empty().html( $(this.#bodyText) );

		this.#dialog.on('shown.bs.modal', function () {
			$( this ).find( '.modal-dialog' ).drags( {handle: '.modal-header'} );
		});

		this.#dialog.modal({ show: true, backdrop: 'static', keyboard: false });

		this.#dialog.on( 'shown.bs.modal', (event) => {
            // console.log( `${this.#dialogId} has been shown` );
		    this.#shown = true;
        });

		// Fired when dialog is completely hidden. Remove dialog from the DOM.
		this.#dialog.on( 'hidden.bs.modal', (event) => {
            // console.log( `${this.#dialogId} has been hidden` );
            this.#dialog.remove();
		});

	};
	
    cleanDlgId() { return this.#dialogId.replace( '#', '' ); }

    beforeOpen() {}

	open() {
	    this.initialise();
		this.beforeOpen();
		this.#modal.show();
	}

    /* // This method works.
    close() {
        var dlg = this;
        if ( this.#shown == false ) {
            window.setTimeout( () => dlg.close(), 100 );
        }
        else this.#modal.hide();
    }
    */

    close1() {
		waitUntil( () => this.#shown )
		    .then( () => this.#modal.hide() )
		    .catch( ( errorMsg ) => console.warn(errorMsg) )
    }

	getHtmlTempate() { return this.#htmlTemplate; }
	getDialog() { return this.#dialog; }
	getModal() { return this.#modal; }

	setHtmlTemplate( template ) { this.#htmlTemplate = template; }

	echoProperties() {
	    return [ this.#htmlTemplate, this.#dialogId, this.#title, this.#bodyText ];
	}
}

/*
A ready to use generic dynamic Bootstrap 5.0 popup dialog.

Properties / Options:

#buttonClass: Bootstrap CSS class names, such as 'btn-danger',
              'btn-warning'.
*/
class GenericDialog extends Dialog {
    #buttonClass = '';

    constructor( options ) {
        super( options );

	    super.setHtmlTemplate(
            `<div class="modal fade" id="${super.cleanDlgId()}" tabindex="-1" aria-labelledby="popupDialogLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div class="modal-content">
						<div class="modal-header">
							<div class="modal-title-container">
							    <h5 class="modal-title d-inline" id="popupDialogLabel">Title</h5>
							</div>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body"></div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
            </div>` );

        if ( options.hasOwnProperty('buttonClass') )
            this.#buttonClass = options.buttonClass;
	}

    initialise() {
        super.initialise()

		if ( this.#buttonClass.length > 0 )
		    $( 'button', super.getDialog() ).removeClass().addClass( 'btn ' + this.#buttonClass );
    }

	echoProperties() {
		return [ ...super.echoProperties(), this.#buttonClass ];
	}
}

/*
A ready to use Bootstrap 5.0 confirmation popup dialog.

Properties / Options:

#confirmCallbackFunc: callback function confirmation was selected.

#notConfirmCallbackFunc: callback function when not confirmed was selected.
*/
class ConfirmationDialog extends Dialog {

	#confirmCallbackFunc = null;
	#notConfirmCallbackFunc = null;

    constructor( options ) {
        super( options );
		
	    super.setHtmlTemplate(
			`<div class="modal fade" id="${super.cleanDlgId()}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
						</div>
						<div class="modal-body"></div>
						<div class="modal-footer">
							<button type="button" id="btnConfirm" class="btn btn-primary">Yes</button>
							<button type="button" id="btnNotConfirm" class="btn btn-primary">No</button>
						</div>
					</div>
				</div>
			</div>` );

        if ( options.hasOwnProperty('confirmCallback') )
            this.#confirmCallbackFunc = options.confirmCallback;

        if ( options.hasOwnProperty('notConfirmCallback') )
            this.#notConfirmCallbackFunc = options.notConfirmCallback;
	}

    beforeOpen() {
	    super.beforeOpen();

		$( '#btnConfirm', super.getDialog() ).on( 'click', ( event ) => {
			super.getModal().hide();

			if ( $.isFunction(this.#confirmCallbackFunc) )
			    this.#confirmCallbackFunc();
		});

		$( '#btnNotConfirm', super.getDialog() ).on( 'click', ( event ) => {
			super.getModal().hide();

			if ( $.isFunction(this.#notConfirmCallbackFunc) )
			    this.#notConfirmCallbackFunc();
		});
    }

	echoProperties() {
		return [ ...super.echoProperties(),
		         this.#confirmCallbackFunc, this.#notConfirmCallbackFunc ];
	}
}