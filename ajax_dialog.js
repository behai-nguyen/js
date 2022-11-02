/*
Date Created: 26/09/2022.

Dependencies:

1. D:\Codes\WebWork\js\bootstrap_dialogs.js
2. D:\Codes\WebWork\js\bootstrap_funcs.js
*/

/*
A dialog to list data for selection.

Required "bootstrap_dialogs.js".

Upon openning, automatically submits an AJAX request to get JSON data.

Renders this JSON data for user selection.

Assumptions:

1. AJAX method is 'get'.

2. Initialisation options passed in are always valid!

3. JSON comes back from server has the following structure:

	On Successful:
		{
			"status": {
				"code": 200,
				"text": "Data has been retrieved successfully."
			},
			"data": [ {...}, ..., {...} ]
		}

	On Failure:
		{
			"status": {
				"code": 500,
				"text": "...message text..."
			}
		}

Properties / Options:

#height: the height of dialog body, required for vertical scrolling.

#csrfToken: value 'X-CSRFToken' AJAX header.

#ajaxUrl: AJAX URL.

#ajaxData: AJAX submission data.

#headers: comma separated list of headers. E.g. 'Id,Name'.

#fields: comma separated list of JSON attribute name. E.g. 'ID,SYSTEM_NAME'.

#selectDataFunc: callback function when a users select an item.
*/
class AjaxDialog extends GenericDialog {
    #height = '100px';
    #csrfToken = '';
    #ajaxUrl = '';
    #ajaxData = '';
    #headers = '';
    #fields = '';
    #toolTipText = '';
    #selectDataFunc = null;

    constructor( options ) {
		var opts = $.extend( {}, options );
        opts.bodyText = '<div class="text-center pt-5"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        super( opts );

        this.#height = options.height;
        this.#csrfToken = options.csrfToken;
        this.#ajaxUrl = options.ajaxUrl;
        this.#ajaxData = options.ajaxData;
        this.#headers = options.headers;
        this.#fields = options.fields;
        this.#toolTipText = options.toolTipText;
        this.#selectDataFunc = options.selectDataFunc;
	}

    #render( data ) {
        // Headers.
        var hT = this.#headers.split( ',' );
		var col = ''
        hT.forEach( function(ht) {
            col += `<div class="col">${ht}</div>`;
        });

        var txt = '<div class="sticky-top py-2" style="background-color:var(--form-heading-color);">' +
		               '<div class="row ps-2">' + col + '</div></div>';

        // Data.
        var fN = this.#fields.split( ',' );
        data.forEach( function(item) {
            var col = '';
            fN.forEach( function(fn) {
                col += `<div class="col">${item[fn]}</div>`;
            });

            txt += `<div class="row ps-2 selector-data" data-item-id="${item[fN[0]]}"
			        role="button">${col}</div>`;
        });

        $( '.modal-body', this.getDialog() ).empty().html( $(txt) );
    }

	#bindSearchResultUIEvents() {
        var thisDialog = this;

		var clickableDivList = $( 'div.selector-data', this.getDialog() );
		clickableDivList.on( 'click', function( event ) {
			var target = $( event.target );
			var id = target.parent().closest('div').attr('data-item-id');

			thisDialog.getModal().hide();

			if ( $.isFunction(thisDialog.#selectDataFunc) )
			    thisDialog.#selectDataFunc( id );
		});

		bindToolTipElements();
	}

    #runAjax() {
        let thisDialog = this;

		$.ajax({
			type: 'get',
			url: this.#ajaxUrl,

			headers: { 'X-CSRFToken': this.#csrfToken },

			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: this.#ajaxData,

			success: function( data, textStatus, jqXHR ) {
                // Setting search result HTML to the DOM.
				thisDialog.#render( data.data );
				thisDialog.#bindSearchResultUIEvents();
			},

			error: function( xhr, error, errorThrown ) {
                $( '.modal-body', thisDialog.getDialog() ).empty().html( $(`<span>${errorThrown}</span>`) );
			}
		});
    }

	open() {
		// Open so spinner can be displayed if required.
        super.open();
        this.#runAjax();
	}

    initialise() {
        super.initialise();

        $( '.modal-title-container', super.getDialog() ).
            append( $('<div class="d-inline ms-2 text-primary h4 bi-question-circle-fill"' +
 			          'role="button" data-bs-toggle="tooltip" data-bs-placement="top" ' +
					  'data-bs-html="true" title="' + this.#toolTipText + '"></div>') );

		$( '.modal-body', super.getDialog() ).
		    css( 'height', this.#height ).css( 'overflow-y', 'auto' ).addClass( 'pt-0 ps-0' );
    }

	echoProperties() {
		return [ ...super.echoProperties(),
		        this.#csrfToken, this.#ajaxUrl, this.#ajaxData,
		        this.#headers, this.#fields, this.#selectDataFunc ];
	}
}