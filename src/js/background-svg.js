'use strict';

const defaultBGColor = `rgba(0, 0, 0, 0.2)`;

/**
 * Generates the SVG for ripples.
 *
 * @param bgColor {string}
 *    The CSS string to use as background color, like: #ccc, rgba(0,0,0,0.2), etc.
 *    The later example is the default color.
 * @returns {string}
 *    The string to use as background image.
 */
module.exports = function ripleySVG (bgColor)
{
  return (`
    <svg xmlns="http://www.w3.org/2000/svg" id="ripleyCircle" height="100" width="100">
      <circle cx="50" cy="50" r="40" fill="${bgColor ? bgColor : defaultBGColor}" />
    </svg>`)
      .replace('\n', '');
};
