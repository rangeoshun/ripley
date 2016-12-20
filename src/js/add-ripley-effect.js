'use strict';

const createRipley = require('./create-ripley');

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
const START_EVENT = !isTouchDevice ? 'mousedown' : 'touchstart';
const END_EVENT = !isTouchDevice ? 'mouseup' : 'touchend';
const OUT_EVENT = !isTouchDevice ? 'mouseout' : 'touchmove';

module.exports = function addRipleyEffect (element) {

  element.addEventListener(START_EVENT, (ev) => {
    if (!element.classList.contains('ripley')) {
      element.classList.add('ripley');
    }

    const id = new Date().getTime();
    const ripleyEffect = createRipley(ev, id, isTouchDevice);

    const outFunc = (ev) => {
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
