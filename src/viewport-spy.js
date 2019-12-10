function ViewportSpy() {
  'use strict';

  let _options, _defaults = {
    container: '.ViewportSpy',
    selector: '[data-observe-intersection]',
    visitedClass: 'visited',
    inViewportClass: 'in-viewport'
  }

  // Public
  function init(options) {
    // Override default options
    _options = typeof options === 'object' ? { ..._defaults, ...options } : { ..._defaults };
    _setupObserver(_options);
  }

  // Private
  function _setupObserver() {
    const elementsToObserve = document.querySelectorAll(_options.selector);

    elementsToObserve.forEach(el => {
      const triggerPoints = el.dataset.triggerPoints;
      let customThreshold = triggerPoints == 'all' ? [] : triggerPoints.split(',').map(s => s.trim());

      if (customThreshold.length == 0) {
        for (let i = 0; i <= 1.0; i += 0.01) {
          customThreshold.push(i);
        }
      }

      _inViewport(el, _vpCallback, {
        root: document.querySelector(_options.container),
        threshold: customThreshold
      });
    });
  }
  
  // Private
  function _vpCallback(entry) {
    const body = document.querySelector('body');
    const selectedElement = entry.target;
    const activeWhenShowing = Number(selectedElement.dataset.inView);
    const action = entry.isIntersecting && entry.intersectionRatio > activeWhenShowing ? 'add' : 'remove';
    const notYetSeen = selectedElement.classList.contains(_options.visitedClass) ? false : true;

    // Apply Classes
    selectedElement.classList[action](_options.inViewportClass);
    if (notYetSeen && action == 'add') selectedElement.classList.add(_options.visitedClass);

    // Dispatch the event
    const event = new CustomEvent('VSevent', { detail: { element: selectedElement } });
    body.dispatchEvent(event);
  }
  
  // Private
  function _inViewport(elem, callback, options = {}) {
    return new IntersectionObserver(entries => {
      entries.forEach(entry => callback(entry));
    }, options).observe(elem);
  }

  return {
    init: init
  };
};