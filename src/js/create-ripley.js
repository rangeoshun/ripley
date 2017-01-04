const createStyle = require('./create-style');
const animationCSS = require('./animation-style');

/**
 * Creates a wrapper element for the ripple effect. Generates and sets the animation
 * style property.
 *
 * @param ev {MouseEvent | TouchEvent}
 *    The user input event for triggering the ripple.
 * @param id {number}
 *    The id for unique ripple like a timestamp.
 * @param isTouchDevice {boolean}
 *    The flag signaling touch devices, passed to the animation generator.
 * @returns {HTMLDivElement}
 *    The ripple effect wrapper DIV.
 */
module.exports = function createRipley (ev, element, id, isTouchDevice)
{
  const ripley = document.createElement('div');

  ripley.appendChild(createStyle(animationCSS(ev, element, id, isTouchDevice)));
  ripley.className = `ripley-effect ripley-in ripley-${id}`;
  ripley.style.animation = `ripley-${id} 0.7s ease-in-out`;

  return ripley;
};
