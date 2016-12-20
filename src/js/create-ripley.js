const createStyle = require('./create-style');
const animationCSS = require('./animation-style');

module.exports = function createRipley (ev, id, isTouchDevice) {
  const ripley = document.createElement('div');
  ripley.appendChild(createStyle(animationCSS(ev, id, isTouchDevice)));
  ripley.className = `ripley-effect ripley-in ripley-${id}`;
  ripley.style.animation = `ripley-${id} 0.7s ease-in-out`;
  return ripley;
};
