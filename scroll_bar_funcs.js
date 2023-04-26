/*
Date Created: 22/02/2023.

https://stackoverflow.com/questions/4814398/how-can-i-check-if-a-scrollbar-is-visible
How can I check if a scrollbar is visible?

Answer by kpull1 on 26/01/2012
My usage case:

    D:\Codes\WebWork\js\bootstrap_funcs.js
    function scrollbarOffset( containerSelector, headerRowSelector ) {
        ...

        if ( !container.hasScrollBar() ) return;
        ...
    }
*/

(function($) {
    $.fn.hasScrollBar = function() {
        return this[0] ? this[0].scrollHeight > this.innerHeight() : false;
    }
})(jQuery);
