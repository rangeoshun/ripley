'use strict';

module.exports = function ripleyStaticCSS () {
  return `
    .ripley {
      position: relative;
    }

    .ripley * {
      pointer-events: none;
    }

    .ripley-effect {
      content: ' ';
      display: block;
      position: absolute;

      width: 100%;
      height: 100%;
      top: 0;
      left:0;

      opacity: 0;

      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 0;

      transition: opacity 0.7s ease-in-out;
    }

    .ripley-in {
      opacity: 0.7;
    }`;
};