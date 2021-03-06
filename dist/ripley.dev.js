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
	const createStyle = __webpack_require__(2);
	const addRipleyEffect = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function ripleyStaticCSS ()
	{
	  return `
	    .ripley {
	      position: relative;
	    }

	    .ripley * {
	      user-select: none;
	    }

	    .ripley-effect {
	      content: '';
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

/***/ },
/* 2 */
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
	module.exports = function createStyle (styleString)
	{
	  const style = document.createElement('style');
	  style.innerHTML = styleString.replace(/\t/g, '').replace(/\n/g, '');

	  return style;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const createRipley = __webpack_require__(4);

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
	  element.classList.add('ripley');

	  element.addEventListener(START_EVENT, (ev) =>
	  {
	    const id = new Date().getTime();
	    const ripleyEffect = createRipley(ev, element, id, isTouchDevice);

	    const outFunc = (ev) =>
	    {
	      setTimeout(() => element.removeChild(ripleyEffect), 70000);
	      element.firstChild.classList.remove('ripley-in');
	      element.removeEventListener(END_EVENT, outFunc);
	      element.removeEventListener(OUT_EVENT, outFunc);
	    };

	    element.insertBefore(ripleyEffect, element.firstChild);
	    element.addEventListener(END_EVENT, outFunc);
	    element.addEventListener(OUT_EVENT, outFunc);
	  });
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const createStyle = __webpack_require__(2);
	const animationCSS = __webpack_require__(5);

	/**
	 * Creates a wrapper element for the ripple effect. Generates and sets the animation
	 * style property.
	 *
	 * @param ev {MouseEvent | TouchEvent}
	 *    The user input event for triggering the ripple.
	 * @param element {HTMLElement}
	 *    The element to ripple.
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
	  ripley.className = `ripley-effect ripley-effect-${id} ripley-in`;
	  ripley.style.animation = `ripley-${id} 0.7s ease-in-out`;

	  return ripley;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const backgroundCSS = __webpack_require__(6);

	/**
	 * Creates per click CSS animation strings.
	 *
	 * @param ev {MouseEvent}
	 *    The click event from the element to ripple over.
	 * @param element {HTMLElement}
	 *    The element to ripple.
	 * @param id {stirng}
	 *    The unique ID for the effect per clicks.
	 * @returns {string}
	 *    the customized ripple animation with correct X and Y coords.
	 */
	module.exports = function ripleyAnimationCSS (ev, element, id, isTouchDevice)
	{
	  const width = element.offsetWidth;
	  const pointer = (!isTouchDevice ? ev : ev.touches[0]);
	  const posX = pointer.clientX - element.offsetLeft;
	  const posY = pointer.clientY - element.offsetTop;
	  const finalRatio = 3;
	  const finalRadius = width * finalRatio;
	  const finalX = posX - finalRadius / 2;
	  const finalY = posY - finalRadius / 2;

	  return `
	    ${backgroundCSS(getComputedStyle(element).color, id)}

	    .ripley-effect-${id} {
	        background-size: ${finalRadius}px;
	        -webkit-background-size: ${finalRadius}px;
	        background-position: ${finalX}px ${finalY}px;
	    }

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
	      }
	    }`;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const svg = __webpack_require__(7);

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
	module.exports = function ripleyBackgroundStyle (bgColor, id)
	{
	  return `
	    .ripley-effect${ id ? '-'+ id : '' } {
	      background-image: url('data:image/svg+xml;base64,${ btoa(svg(bgColor)) }');
	    }`;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	const defaultColor = `rgba(0, 0, 0, 0.2)`;

	/**
	 * Generates the SVG for ripples.
	 *
	 * @param customColor {string}
	 *    The CSS string to use as background color, in rgba format like: rgb(0,0,0).
	 * @returns {string}
	 *    The string to use as background image.
	 */
	module.exports = function ripleySVG (customColor)
	{
	  const color = (customColor || defaultColor);
	  const colorSlice = JSON.parse(
	    color
	      .slice(
	        color.indexOf('(')
	      )
	      .replace('(', '[')
	      .replace(')', ']')
	  );
	  colorSlice[3] = 0.2;

	  const normalizedColor = `rgba(${colorSlice.join(',')})`;

	  return (`
	    <svg xmlns="http://www.w3.org/2000/svg" id="ripleyCircle" height="100" width="100">
	      <circle cx="50" cy="50" r="40" fill="${normalizedColor}" />
	    </svg>`)
	      .replace('\n', '');
	};


/***/ }
/******/ ]);