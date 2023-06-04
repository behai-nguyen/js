/*
Date Created: 01/06/2023.

Waits ms milliseconds before firing function fn.

Reference:
    https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing
	How to delay the .keyup() handler until the user stops typing?
	
    https://stackoverflow.com/a/1909508/20728472
	Answered by Christian C. Salvadó, 16/05/2019.

My usage case:

            $( `#${this.options.localityId}`, this.$austPostcode ).on({
			    keyup: delay( function(event) {
					if ( event.which == 27 ) {
						_this._reverseAllFieldsValue();
						_this._hideResultPanel();
						return;
					};

			        var val = $( event.target ).val();
			        if ( val.length < 3 ) return;

                    _this._doSearch( val );
			    }, this.options.keyStrokeDelay ),
				
				...
				
Arguments:

fn: the callback function.
ms: number of milliseconds to wait before firing fn.				
*/
function delay(fn, ms) {
  let timer = 0
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}
