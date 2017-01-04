'use strict';

const defaultColor = `rgba(0, 0, 0, 0.2)`;

/**
 * Generates the SVG for ripples.
 *
 * @param customColor {string}
 *    The CSS string to use as background color, in rgba format like: rgb(0,0,0).
 * @returns {string}
 *    The string to use as background image.
 */
module.exports = function ripleySVG (customColor)
{
  const color = (customColor || defaultColor);
  const colorSlice = JSON.parse(
    color
      .slice(
        color.indexOf('(')
      )
      .replace('(', '[')
      .replace(')', ']')
  );
  colorSlice[3] = 0.2;

  const normalizedColor = `rgba(${colorSlice.join(',')})`;

  return (`
    <svg xmlns="http://www.w3.org/2000/svg" id="ripleyCircle" height="100" width="100">
      <circle cx="50" cy="50" r="40" fill="${normalizedColor}" />
    </svg>`)
      .replace('\n', '');
};
