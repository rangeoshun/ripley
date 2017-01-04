'use strict';

const svg = require('./background-svg');

/**
 * Creates a CSS string for initialization of effects.
 *
 * @param bgColor {string}
 *    The CSS color to use for the effect.
 * @param id {string}
 *    The ID for unique background color.
 * @returns {string}
 *    The CSS string to set ripple effect background.
 */
module.exports = function ripleyBackgroundStyle (bgColor, id)
{
  return `
    .ripley-effect${ id ? '-'+ id : '' } {
      background-image: url('data:image/svg+xml;base64,${ btoa(svg(bgColor)) }');
    }`;
};
