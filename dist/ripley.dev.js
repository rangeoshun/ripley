/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const staticCSS = __webpack_require__(1);
	const backgroundCSS = __webpack_require__(2);
	const animationCSS = __webpack_require__(4);
	const createStyle = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const svg = __webpack_require__(3);

	/**
	 * Creates a CSS string for initialization of effects.
	 *
	 * @param bgColor {string}
	 *    The CSS color to use for the effect.
	 * @param id {string}
	 *    The ID for unique background color.
	 * @returns {string}
	 *    The CSS string to set ripple effect background.
	 */
	module.exports = function ripleyBackgroundStyle (bgColor, id) {
	  return `
	    .ripley-effect${ id ? '-'+ id : '' } {
	      background-image: url('data:image/svg+xml;utf8,${ svg(bgColor) }');
	    }`;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	const defaultBGColor = `rgba(0, 0, 0, 0.2)`;

	/**
	 * Generates the SVG for ripples.
	 *
	 * @param bgColor {string}
	 *    The CSS string to use as background color, like: #ccc, rgba(0,0,0,0.2), etc.
	 *    The later example is the default color.
	 * @returns {string}
	 *    The string to use as background image.
	 */
	module.exports = function ripleySVG (bgColor) {
	  return (`
	    <svg xmlns="http://www.w3.org/2000/svg" id="ripleyCircle" height="100" width="100">
	      <circle cx="50" cy="50" r="40" fill="${bgColor ? bgColor : defaultBGColor}" />
	    </svg>`)
	      .split('\n')
	      .join('');
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	module.exports = function ripleyAnimationCSS (ev, id) {

	  const width = ev.target.offsetWidth;
	  const posX = ev.offsetX;
	  const posY = ev.offsetY;
	  const finalRatio = 3;
	  const finalRadius = width * finalRatio;
	  const finalX = posX - finalRadius / 2;
	  const finalY = posY - finalRadius / 2;

	  return `
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
	        opacity: 0;
	      }
	    }`;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates style tag with requested content.
	 *
	 * @param styleString {string}
	 *      The string to be appended to the style tag.
	 * @returns {HTMLStyleElement}
	 *      A real style tag element with requested content.
	 */
	module.exports = function createStyle (styleString) {
	  const style = document.createElement('style');
	  style.innerHTML = styleString.replace(/\t/g, '').replace(/\n/g, '');
	  return style;
	};


/***/ }
/******/ ]);