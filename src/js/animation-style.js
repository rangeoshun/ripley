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
module.exports = function ripleyAnimationCSS (ev, id, isTouchDevice) {

  const width = ev.target.offsetWidth;
  const posX = !isTouchDevice ? ev.offsetX : ev.touches[0].clientX - ev.target.offsetLeft;
  const posY = !isTouchDevice ? ev.offsetY : ev.touches[0].clientY - ev.target.offsetTop;
  const finalRatio = 3;
  const finalRadius = width * finalRatio;
  const finalX = posX - finalRadius / 2;
  const finalY = posY - finalRadius / 2;

  return `
    .ripley-${id} {
        background-size: ${finalRadius}px;
        -webkit-background-size: ${finalRadius}px;
        background-position: ${finalX}px ${finalY}px;
    }

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
      }
    }`;
}
