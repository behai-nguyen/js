/*
Bootstrap UI, CSS, etc., related functions.

Dependencies: None.
*/

// This function is copied from the official page.
function bindToolTipElements() {
	var tooltipTriggerList = [].slice.call( document.querySelectorAll('[data-bs-toggle="tooltip"]') );

	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	});
};

/*
Example usage:

    -- HTML:

        <div id="form-header" class="row mx-1">
            <div class="col-6">
                <div class="row py-2 border-bottom selector-source-resource"
                    style="background-color:var(--form-heading-color)">
                    <div class="col-4">Id</div>
                    <div class="col-6">Name</div>
                    <div class="col-2 text-center text-primary bi-question-circle-fill"
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true"
                        title="Please click around <span class=&quot;text-secondary&quot;>&nbsp;<span class=&quot;bi-pencil-fill&quot;></span>&nbsp;</span> to select the Resource to edit.">
                    </div>
                </div>
            </div>
            ...
        </div>

    -- Data content section, note the class "selector-item-entry":

        <div class="row mx-1 selector-working-area">
            <div class="col-6 vertical-scrollable selector-output-area">
                <div class="row mt-1 selector-item-entry" data-item-id="${r.id}">
                    <div class="col-4">${r.id}</div>
                    <div class="col-6">${r.name}</div>
                    <div class="col-2 text-center"><button type="button" class="btn btn-secondary btn-sm selector-select-resource">&nbsp;<span class="bi-pencil-fill"></span>&nbsp;</button></div>
                </div>
            </div>
            ...
        </div>

    -- Script:

        $( document ).ready( function() {
            ...

            $( window ).resize( () => {
                ...
                scrollbarOffset( 'div.selector-output-area', 'div.selector-source-resource' );
                ...
            });
            ...
        });

        Also should call whenever there is a change in the content of
        div.selector-output-area which removes or adds the vertical
        scrollbar.

        div.selector-source-resource ( header div ) is the header of
        div.selector-output-area ( data div ). Data div has a vertical scrollbar,
        and this vertical scrollbar is below the header div.

        Without the scrollbar, the headings and the data line up; when the scrollbar
        is present, it pushes the data columns to the left: the widths of the header
        columns are now larger than the width of the data columns. The widths of the
        header columns need to be adjusted to match the width of the data columns.

        For each header column, identify the Bootstrap CSS col-1, ..., col-12 used.
        Then, from the first data row, using each of the CSS identified previously,
        assign the width of corresponding data columns to header columns: making them
        line up again.

Another example usage:

        <div id="form-header" class="row mx-1">
            <div class="col fw-bold">
                <div class="row py-2 border-bottom selector-table-header" style="background-color:var(--form-heading-color)">
                    <div class="col-1">Id</div>
                    <div class="col-6">Session Id</div>
                    <div class="col-2">Expiry</div>
                </div>
            </div>
        </div>

    -- Data content section, note the class "selector-item-entry":

        <div class="row mx-1 vertical-scrollable">
            <div class="col selector-data-table">
                <div class="row py-2 selector-item-entry" data-item-id="${itm.id}" role="button">
                    <div class="col-1">${itm.id}</div>
                    <div class="col-6">${itm.session_id}</div>
                    <div class="col-2">${itm.expiry}</div>
                </div>
            </div>
        </div>

        $( document ).ready( function() {
            setWorkingAreaHeight();
            $( window ).resize( () => {
                setWorkingAreaHeight();
                scrollbarOffset( 'div.selector-data-table', 'div.selector-table-header' );
            });

            renderSessions( status );
        });

        function renderSessions( status ) {
            if ( status == null ) return;
            if ( status.data.items.length == 0 ) return;

            var outputArea = $( 'div.selector-data-table' );

            $( 'div.row.selector-item-entry' ).remove();
            status.data.items.forEach( ( itm ) => {
                var html = `<div class="row py-2 selector-item-entry" data-item-id="${itm.id}" role="button">
                                <div class="col-1">${itm.id}</div>
                                <div class="col-6">${itm.session_id}</div>
                                <div class="col-2">${itm.expiry}</div>
                            </div>`;
                outputArea.append( $(html) );
            });

            ...
            ...
            scrollbarOffset( 'div.selector-data-table', 'div.selector-table-header' );
        };
*/
function scrollbarOffset( containerSelector, headerRowSelector ) {
	var container = $( containerSelector );

    /*
	For each header columns: works out the assigned Bootstrap col-99
	class, and stores the class names in local array classes. I.e.

	-- For the HTML above: classes = [ 'col-4', 'col-6', 'col-2' ].
	*/
	let headerColumns = $( 'div', $(headerRowSelector) ).toArray();
	let classes = headerColumns.reduce(
		( prevItem, col ) => {
			var arr = $(col).attr( 'class' ).split( ' ' );
			arr.forEach( (item) => {
				if ( item.includes('col-') ) {
			        prevItem.push( item );
					return;
				};
			});
		    return prevItem;
		}, []
	);

	// headerColumns.length == classes.length.
    $.each( classes, ( i, colClass ) => {
		var dataCol = $( `div.row.selector-item-entry:first-child div.${colClass}`, container );
		$( headerColumns[i] ).css( 'width', dataCol.css('width') );
	});
};