/*
Bootstrap UI, CSS, etc., related functions.

Dependencies:

1. Bootstrap v5.0.
*/

// This function is copied from the official page.
function bindToolTipElements() {
	var tooltipTriggerList = [].slice.call( document.querySelectorAll('[data-bs-toggle="tooltip"]') );

	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	});
};