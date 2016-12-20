'use strict';

const staticCSS = require('./js/static-style');
const backgroundCSS = require('./js/background-style');
const createStyle = require('./js/create-style');
const addRipleyEffect = require('./js/add-ripley-effect');

document.head.appendChild(createStyle(`${staticCSS()}\n${backgroundCSS()}`));

window.ripley = {
  add: addRipleyEffect
};

document.addEventListener(
  'DOMContentLoaded', (ev) => {
    document.querySelectorAll('.ripley').forEach((element) =>
      addRipleyEffect(element)
    );
  }
);
