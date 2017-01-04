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
	const createStyle = __webpack_require__(4);
	const addRipleyEffect = __webpack_require__(5);

	document.head.appendChild(createStyle(`${staticCSS()}\n${backgroundCSS()}`));

	window.ripley = {
	  add: addRipleyEffect
	};

	document.addEventListener(
	  'DOMContentLoaded', (ev) =>
	  {
	    document.querySelectorAll('.ripley').forEach((element) =>
	      addRipleyEffect(element)
	    );
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

	      width: inherit;
	      height: inherit;
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
	module.exports = function ripleyBackgroundStyle (bgColor, id)
	{
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
	module.exports = function ripleySVG (bgColor)
	{
	  return (`
	    <svg xmlns="http://www.w3.org/2000/svg" id="ripleyCircle" height="100" width="100">
	      <circle cx="50" cy="50" r="40" fill="${bgColor ? bgColor : defaultBGColor}" />
	    </svg>`)
	      .replace('\n', '');
	};


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const createRipley = __webpack_require__(6);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const createStyle = __webpack_require__(4);
	const animationCSS = __webpack_require__(7);

	/**
	 * Creates a wrapper element for the ripple effect. Generates and sets the animation
	 * style property.
	 *
	 * @param ev {MouseEvent | TouchEvent}
	 *    The user input event for triggering the ripple.
	 * @param id {number}
	 *    The id for unique ripple like a timestamp.
	 * @param isTouchDevice {boolean}
	 *    The flag signaling touch devices, passed to the animation generator.
	 * @returns {HTMLDivElement}
	 *    The ripple effect wrapper DIV.
	 */
	module.exports = function createRipley (ev, element, isTouchDevice)
	{
	  const id = element.dataset.ripleyId;
	  const ripley = document.createElement('div');
	  ripley.appendChild(createStyle(animationCSS(ev, element, isTouchDevice)));
	  ripley.className = `ripley-effect ripley-in ripley-${id}`;
	  ripley.style.animation = `ripley-${id} 0.7s ease-in-out`;
	  return ripley;
	};


/***/ },
/* 7 */
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
	module.exports = function ripleyAnimationCSS (ev, element, isTouchDevice)
	{
	  const id = element.dataset.ripleyId;
	  const width = element.offsetWidth;
	  const pointer = (!isTouchDevice ? ev : ev.touches[0]);
	  const posX = pointer.clientX - element.offsetLeft;
	  const posY = pointer.clientY - element.offsetTop;
	  const finalRatio = 3;
	  const finalRadius = width * finalRatio;
	  const finalX = posX - finalRadius / 2;
	  const finalY = posY - finalRadius / 2;

	console.log(ev)

	  return `
	    .ripley-${id} {
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


/***/ }
/******/ ]);