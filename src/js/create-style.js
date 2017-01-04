'use strict';

/**
 * Creates style tag with requested content.
 *
 * @param styleString {string}
 *      The string to be appended to the style tag.
 * @returns {HTMLStyleElement}
 *      A real style tag element with requested content.
 */
module.exports = function createStyle (styleString)
{
  const style = document.createElement('style');
  style.innerHTML = styleString.replace(/\t/g, '').replace(/\n/g, '');

  return style;
};
