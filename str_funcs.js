/*
    Date Created: 25/02/2023.
*/

/**
 * Return the portion of the string after the last occurrence of the given `delimiter`.
 *
 * (c) https://futurestud.io/tutorials/get-the-part-after-last-occurrence-in-a-string-in-javascript-or-node-js
 *
 * @param {String} delimiter
 *
 * @returns {String}
 */
function afterLast (value, delimiter) {  
  value = value || ''

  return delimiter === ''
      ? value
      : value.split(delimiter).pop()
}
