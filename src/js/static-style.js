'use strict';

module.exports = function ripleyStaticCSS () {
  return `
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

      z-index: 0;
    }
  `;
};