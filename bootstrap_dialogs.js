/*
    Date Created: 04/04/2022.
*/

/*
A parent-most generic dynamic Bootstrap 5.0 popup dialog.

The dialog HTML is created dynamically and gets removed 
after finished closing.
		
Properties / Options:

#htmlTemplate: custom HTML body to be provided by caller.

#dialogId: this instance unique DOM Id.

#title: dialog title.

#message: actual message text to be displayed inside dialog body.
			
          This is HTML: text must be wrapped inside a HTML tag, e.g.:
			
			<span>Please contact <strong>Support</strong>...</span>
*/
class Dialog {
    #htmlTemplate = '';
	#dialogId = '';
	#title = '';
	#message = '';

	#dialog = null;
	#modal = null;
	
	//
	// options.dialogId -- should already have '#' in front.
	//
    constructor( options ) {
        this.#dialogId = options.dialogId;
        this.#title = options.title;
        this.#message = options.message;
	}
	
	initialise() {
		// Should not exist, but just in case.
		$( this.#dialogId ).remove();
		
		$( 'body' ).append( $(this.#htmlTemplate) );
	
		this.#dialog = $( this.#dialogId );
		this.#modal = new bootstrap.Modal( this.#dialogId );
		
		$( '.modal-title', this.#dialog ).text( this.#title );
		$( '.modal-body', this.#dialog ).empty().html( $(this.#message) );
	
		this.#dialog.on('shown.bs.modal', function () {
			//$(this).find('.modal-header').drags();
			$(this).find('.modal-dialog').drags();
		});
		this.#dialog.modal({ show: true, backdrop: 'static', keyboard: false });
		
		// Fired when dialog is completely hidden. Remove dialog from the DOM.
		this.#dialog.on( 'hidden.bs.modal', ( event ) => this.#dialog.remove() );		
	};
	
    beforeOpen() {}
	
	open() {
	    this.initialise();
		this.beforeOpen();
		this.#modal.show();
	}
	
	getHtmlTempate() {
	    return this.#htmlTemplate;
	}
	
	getDialog() {
	    return this.#dialog;
	}
	
	getModal() {
	    return this.#modal;
	}

	setHtmlTemplate( template ) {
	    this.#htmlTemplate = template;
	}
	
	echoProperties() {
	    return [ this.#htmlTemplate, this.#dialogId, this.#title, this.#message ];
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
            `<div class="modal fade" id="popupDialog" tabindex="-1" aria-labelledby="popupDialogLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="popupDialogLabel">Title</h5>
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
			`<div class="modal fade" id="confirmDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
