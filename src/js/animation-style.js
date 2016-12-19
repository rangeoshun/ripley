'use strict';

/**
 * Creates per click CSS animation strings.
 *
 * @param ev {MouseEvent}
 *    The click event from the element to ripple over.
 * @param id {stirng}
 *    The unique ID for the effect per clicks.
 * @returns {string}
 *    the customized ripple animation with correct X and Y coords.
 */
module.exports = function ripleyAnimationCSS (ev, id) {

  const width = ev.target.offsetWidth;
  const posX = ev.offsetX;
  const posY = ev.offsetY;
  const finalRatio = 3;
  const finalRadius = width * finalRatio;
  const finalX = posX - finalRadius / 2;
  const finalY = posY - finalRadius / 2;

  return `
    @keyframes ripley-${id} {
      0% {
        background-size: 0;
        -webkit-background-size: 0;
        background-position: ${posX}px ${posY}px;
        opacity: 0.2;
      }
      50% {
        opacity: 0.7;
      }
      100% {
        background-size: ${finalRadius}px;
        -webkit-background-size: ${finalRadius}px;
        background-position: ${finalX}px ${finalY}px;
        opacity: 0;
      }
    }`;
}
