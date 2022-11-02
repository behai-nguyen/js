//
// Description:
//
//    Enables draggable without using jQuery UI.
//
// Sources:
//
//    This code is not mine, it is from:
//
//    https://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
//
//    Referenced on Stackoverflow:
//
//    https://stackoverflow.com/questions/45194164/bootstrap-3-modal-make-it-movable-draggable-without-jquery-ui
//
//    See answer on Apr 13, 2020 by jstuardo.
//    Reproduced code from css-tricks with some slight modifications.
// 
//    ( I found css-tricks first, then this Stackoverflow post :) )
//
// Usage:
//
//   $( '#exampleModal' ).on('shown.bs.modal', function () {
//       $(this).find('.modal-dialog').drags();
//   });
//
//   exampleModal is a Bootstrap 5.1 modal dialog HTML.
//
(function ($) {
    $.fn.drags = function (opt) {

        opt = $.extend({ handle: "", cursor: "move" }, opt);

        var $el = null;
        if (opt.handle === "") {
            $el = this;
        } else {
            $el = this.find(opt.handle);
        }
        return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
            var $drag = null;
            if (opt.handle === "") {				
				// $drag = $(this).addClass('draggable');
				// jstuardo's modifications.
				$drag = $(this).parents('.modal-dialog').addClass('draggable');
            } else {
				// $drag = $(this).addClass('active-handle').parent().addClass('draggable');
				// jstuardo's modifications.
				$drag = $(this).parents('.modal-dialog').addClass('active-handle').parent().addClass('draggable');				
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function () {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function () {
            if (opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);
