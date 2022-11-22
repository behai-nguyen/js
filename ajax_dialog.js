/*
Date Created: 26/09/2022.

Dependencies:

1. D:\Codes\WebWork\js\bootstrap_dialogs.js
2. D:\Codes\WebWork\js\bootstrap_funcs.js
*/

/*
A dialog which retrieves data via AJAX and displays all for selection.

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

    On Session Expired: HTML, login page.

Properties / Options:

#csrfToken: value 'X-CSRFToken' AJAX header.

#ajaxUrl: AJAX URL.

#ajaxData: AJAX submission data.

#headers: comma separated list of headers. E.g. 'Id,Name'.

#fields: comma separated list of JSON attribute name. E.g. 'ID,SYSTEM_NAME'.

#selectDataFunc: callback function when a users select an item.
*/
class AjaxDialog extends Dialog {
    #csrfToken = '';
    #ajaxUrl = '';
    #ajaxData = '';
	#rawHeaders = '';
    #headers = '';
	#rawFields = '';
    #fields = '';
    #selectDataFunc = null;

    constructor( options ) {
		var opts = $.extend( {}, options );
        opts.setBodyText = false;
        opts.dialogId = '#ajaxDialog';
        super( opts );

        super.setHtmlTemplate( this.template() );

        this.#csrfToken = options.csrfToken;
        this.#ajaxUrl = options.ajaxUrl;
        this.#ajaxData = options.ajaxData;
        this.#rawHeaders = options.headers;
		this.#headers = options.headers.split( ',' );
        this.#rawFields = options.fields;
		this.#fields = options.fields.split( ',' );
        this.#selectDataFunc = options.selectDataFunc;
	}

    #prepareNavigationButtons( data ) {
		$( '#btnFirst, #btnPrev, #btnNext, #btnLast' )
		    .off( 'click' ).prop( 'disabled', true );

		if ( data.links.hasOwnProperty('first') )
		    $( '#btnFirst' ).attr( 'data-nav', data.links.first ).prop( 'disabled', false );

		if ( data.links.hasOwnProperty('prev') )
		    $( '#btnPrev' ).attr( 'data-nav', data.links.prev ).prop( 'disabled', false );

		if ( data.links.hasOwnProperty('next') )
		    $( '#btnNext' ).attr( 'data-nav', data.links.next ).prop( 'disabled', false );

		if ( data.links.hasOwnProperty('last') )
		    $( '#btnLast' ).attr( 'data-nav', data.links.last ).prop( 'disabled', false );

		let dialog = this;

		$( '#btnFirst, #btnPrev, #btnNext, #btnLast' ).on( 'click', function( event ) {
			var data = $( this ).attr( 'data-nav' ) + '&' + dialog.#ajaxData;

            var filter = $( '#filter' ).val();
			if ( filter.length > 0 ) data += '&filter=' + filter;
			dialog.#runAjax( data );
		});
	}

    #render( data ) {
		$( '.selector-loading', this.getDialog() ).addClass( 'd-none' );

        let thisDlg = this;
        let dataCntnr = $( '.selector-data-container', this.getDialog() ).empty();

        // Data.
        data.items.forEach( function(item) {
            var col = '';
            thisDlg.#fields.forEach( function(fn) {
                col += `<div class="col">${item[fn]}</div>`;
            });

            dataCntnr.append( $(`<div class="row ps-2 selector-data" data-item-id="${item[thisDlg.#fields[0]]}"
			                   role="button">${col}</div>`) );
        });

        this.#prepareNavigationButtons( data );
    }

	#bindSearchResultUIEvents() {
        let thisDlg = this;

		var clickableDivList = $( 'div.selector-data', this.getDialog() );
		clickableDivList.on( 'click', function( event ) {
			var target = $( event.target );
			var id = target.parent().closest('div').attr('data-item-id');

			thisDlg.getModal().hide();

			if ( $.isFunction(thisDlg.#selectDataFunc) )
			    thisDlg.#selectDataFunc( id );
		});

		bindToolTipElements();
	}

    #runAjax( ajaxData ) {
        $( '.selector-loading', this.getDialog() ).removeClass( 'd-none' );

        let thisDlg = this;

		$.ajax({
			type: 'get',
			url: this.#ajaxUrl,

			headers: { 'X-CSRFToken': this.#csrfToken },

			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: ajaxData,

			success: function( data, textStatus, jqXHR ) {
				if ( typeof(data.data) != 'undefined' && data.status.code == OK ) {
				    thisDlg.#render( data.data );
				    thisDlg.#bindSearchResultUIEvents();
				}
				else {
                    thisDlg.close1();
					displayError( jqXHR, textStatus, data.status.text );
                }
			},

			error: function( xhr, error, errorThrown ) {
                thisDlg.close1();
                displayError( xhr, error, errorThrown );
			}
		});
    }

	open() {
		// Open so spinner can be displayed if required.
        super.open();
        this.#runAjax( this.#ajaxData );
	}

    initialise() {
        super.initialise();

        /*
		$( "div[data-bs-toggle='tooltip']", super.getDialog() )
            .tooltip({ container: 'body', trigger: 'click' });
        */

		$( "div[data-bs-toggle='tooltip']", super.getDialog() )
            .attr( 'title', this.toolTip() ).css( 'cursor', 'pointer' );

        // Headers.
		$( '.selector-header', this.getDialog() ).append(
            $(this.#headers.reduce( (html, h) => {return html + `<div class="col">${h}</div>`}, '')) );

        let dialog = this;
		$( '#btnFilter' ).on( 'click', function( event ) {
			var data = $( '#filterField, #filter' ).serialize() + '&' + dialog.#ajaxData;
			dialog.#runAjax( data );
		});

        let filterField = $( '#filterField' );
        filterField.find( 'option' ).remove();

        filterField.append( $(new Option('--Select--', '')) );
        $.each( this.#headers, ( i, hdr ) => {
			filterField.append( $(new Option(hdr, this.#fields[i])) );
		});

        $( '#filterField, #filter' ).on( 'blur', function(event) {
            $( '#btnFilter' ).prop( 'disabled', true );

			var fieldEmpty = $( '#filterField' ).val().length == 0;
            var valueEmpty = $( '#filter' ).val().length == 0;
            // Both must have value; or both must be empty to
            // enable filter button.
            if ( fieldEmpty != valueEmpty ) return;

            $( '#btnFilter' ).prop( 'disabled', false );
		});
    }

	echoProperties() {
		return [ ...super.echoProperties(),
		        this.#csrfToken, this.#ajaxUrl, this.#ajaxData,
		        this.#headers, this.#fields, this.#selectDataFunc ];
	}

    template() {
	    var dlgHtml =
		`<div class="modal fade selector-system-menu" id="ajaxDialog" tabindex="-1" aria-labelledby="ajaxDialogLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
                        <h6 class="modal-title me-2" id="ajaxDialogLabel">Title</h6>
                        <div class="d-inline ms-2 text-primary h4 bi-question-circle-fill" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title=""></div>
					</div>

					<div class="modal-body pt-0 ps-0" style="overflow-y: auto;">
						<div class="sticky-top">
							<div class="row ps-2">
								<div class="input-group input-group-sm">
									<label class="input-group-text" for="filterField">Filter By</label>
									<select name="filterField" id="filterField" size="1" class="form-select form-select-sm"></select>

									<input type="text" name="filter" id="filter" class="form-control form-control-sm input-group-append" placeholder="Filter..." aria-label="Filter" aria-describedby="basic-addon2">
									<button class="btn btn-sm btn-secondary" type="button" id="btnFilter" disabled>&nbsp;<span class="bi-filter"></span>&nbsp;</button>
								</div>
							</div>
							<div class="row ps-2 py-2 selector-header" style="background-color:var(--form-heading-color);"></div>
						</div>

						<div class="selector-data-container">
						</div>
					</div>

					<div class="modal-footer">
						<div class="btn-group me-auto selector-nav-panel" role="group" aria-label="Navigation buttons">
							<button type="button" id="btnFirst" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-start-fill"></span>&nbsp;</button>
							<button type="button" id="btnPrev" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-backward-fill"></span>&nbsp;</button>
							<button type="button" id="btnNext" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-forward-fill"></span>&nbsp;</button>
							<button type="button" id="btnLast" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-end-fill"></span>&nbsp;</button>
						</div>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>

				<div class="spinner-overlay selector-loading">
					<div class="spinner-border text-danger" style="width:4rem; height:4rem;" role="status">
					    <span>Loading...</span>
					</div>
					<div class="spinner-grow text-danger" style="width:4rem; height:4rem;" role="status" >
						<span>&nbsp;</span>
					</div>
				</div>

			</div>
		</div>`;

		return dlgHtml;
	}

	toolTip() {
		var toolTipHtml =
		`
		<ul>
			<li>To select: click anywhere on the highlighted row.</li>
			<li>To apply a filter: select a “Filter By” field, enter a filter value, then click on
			<span role="button" class="btn btn-secondary">&nbsp;<span class="bi-filter"></span>&nbsp;</span>.
			</li>
			<li>To clear an existing filter: clear both “Filter By” and filter value, then click on
			<span role="button" class="btn btn-secondary">&nbsp;<span class="bi-filter"></span>&nbsp;</span>.
			</li>
			<li>
			To browse through: click on
			<span role="button" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-start-fill"></span>&nbsp;</span><span role="button" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-backward-fill"></span>&nbsp;</span><span role="button" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-forward-fill"></span>&nbsp;</span><span role="button" class="btn btn-info" disabled>&nbsp;<span class="bi-skip-end-fill"></span>&nbsp;</span>
			if enabled.
			</li>
		</ul>
		`;

		return toolTipHtml;
	}
}