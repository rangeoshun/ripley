'use strict';

const staticCSS = require('./js/static-style');
const backgroundCSS = require('./js/background-style');
const animationCSS = require('./js/animation-style');
const createStyle = require('./js/create-style');

ripleyInit();

module.exports = {
  add: addRipleyEffectOnClick
};

function createRipley (ev, id) {
  const ripley = document.createElement('div');
  ripley.appendChild(createStyle(animationCSS(ev, id)));
  ripley.className = 'ripley-effect';
  ripley.style.animation = `ripley-${id} 0.7s ease-in-out`;
  return ripley;
}

function addRipleyEffectOnClick (element) {
  element.addEventListener('click', (ev) => {
    const id = new Date().getTime();
    const ripleyEffect = createRipley(ev, id);

    element.insertBefore(ripleyEffect, element.firstChild);
    setTimeout(() => element.removeChild(ripleyEffect), 70000);
  });
}

function ripleyInit () {
  document.head.appendChild(createStyle(`${staticCSS()}\n${backgroundCSS()}`));

  document.addEventListener(
    'DOMContentLoaded', (ev) => {
      document.querySelectorAll('.ripley').forEach((element) =>
        addRipleyEffectOnClick(element)
      );
    }
  );
};
