'use strict';

const staticCSS = require('./js/static-style');
const createStyle = require('./js/create-style');
const addRipleyEffect = require('./js/add-ripley-effect');

document.head.appendChild(createStyle(`${staticCSS()}\n`));

window.ripley = {
  add: addRipleyEffect
};

document.addEventListener(
  'DOMContentLoaded', (ev) =>
  {
    const ripleys = document.querySelectorAll('.ripley')

    for (let i = 0; i < ripleys.length; i++)
    {
      addRipleyEffect(ripleys[i]);
    }
  }
);
