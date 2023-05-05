/*
    Date Created: 03/03/2023.
*/

/**
 * Get current locale.
 *
 * (c) https://stackoverflow.com/questions/25606730/get-current-locale-of-chrome#answer-42070353
 *
 * @returns {String} current locale. E.g. en-GB
 */
function currentLocale() {
    return ( window.navigator.languages ) ? window.navigator.languages[0] 
        : window.navigator.userLanguage || window.navigator.language;
}
