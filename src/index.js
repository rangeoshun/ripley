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
  ripley.className = 'ripley-effect';
  ripley.style.animation = `animation: ripley-${id} 0.7s ease-in-out;`;
  ripley.appendChild(createStyle(animationCSS(ev, id)));
  return ripley;
}

function addRipleyEffectOnClick (element) {
  element.addEventListener('click', (ev) => {
    const id = new Date().getTime();
    const element = ev.target;
    const ripleyEffect = createRipley(ev, id);

    element.insertBefore(ripleyEffect, element.firstChild);
    setTimeout(() => element.removeChild(ripleyEffect), 700);
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
