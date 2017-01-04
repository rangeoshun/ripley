'use strict';

const createRipley = require('./create-ripley');

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
const START_EVENT = !isTouchDevice ? 'mousedown' : 'touchstart';
const END_EVENT = !isTouchDevice ? 'mouseup' : 'touchend';
const OUT_EVENT = !isTouchDevice ? 'mouseout' : 'touchmove';

/**
 * Assignes ripple effect to desired element. Attaches an event listener
 * for the various stages of interactions. It ads a ripple wrapper element,
 * and manipulates classes according to events.
 * It also appends ripley class name onto the element, but stays idle if the
 * element already has a ripple added.
 *
 * @param element {HTMLElement}
 *    The element to ripple.
 */
module.exports = function addRipleyEffect (element)
{
  if (element.dataset.ripley)
  {
    return;
  }

  element.dataset.ripley = true;
  element.dataset.ripleyId = new Date().getTime();
  element.classList.add('ripley');

  element.addEventListener(START_EVENT, (ev) =>
  {
    const ripleyEffect = createRipley(ev, element, isTouchDevice);

    const outFunc = (ev) =>
    {
      setTimeout(() => element.removeChild(ripleyEffect), 700);
      element.firstChild.classList.remove('ripley-in');
      element.removeEventListener(END_EVENT, outFunc);
      element.removeEventListener(OUT_EVENT, outFunc);
    };

    element.insertBefore(ripleyEffect, element.firstChild);
    element.addEventListener(END_EVENT, outFunc);
    element.addEventListener(OUT_EVENT, outFunc);
  });
};
