/*
Date Created: 22/11/2022.

https://stackoverflow.com/questions/22125865/how-to-wait-until-a-predicate-condition-becomes-true-in-javascript
How to wait until a predicate condition becomes true in JavaScript?

Answer by EranGrin on 18/10/2021 -- The cleanest solution (improvement of @tdxius solution) 
based on controlled time interval loop, promise and timeout to reject the promise and clear 
intervals in case condition isn't met in a given time.

My usage case:

    D:\Codes\WebWork\js\bootstrap_dialogs.js
    close1() {
		waitUntil( () => this.#shown )
		    .then( () => this.#modal.hide() )
		    .catch( ( errorMsg ) => console.warn(errorMsg) )
    }
*/

const waitUntil = ( conditionFunc ) => {
	return new Promise( (resolve, reject) => {
		const interval = setInterval( () => {
			if ( !conditionFunc() ) {
				return;
			}

			clearInterval( interval );
			resolve();
		}, 100 );

		setTimeout( () => {
			clearInterval( interval );
			reject( 'waitUntil() timed out...' );
		}, 5000);
	});
}