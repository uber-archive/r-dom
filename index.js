'use strict';
var React = require('react');

module.exports = r;

// Export the React.DOM html tags
for (var tag in React.DOM) {
  if (React.DOM.hasOwnProperty(tag)) {
    r[tag] = createTagFn(tag);
  }
}

function r(component, properties, children) {
  properties = properties || {};

  // A properties object is optional so shift arguments if missing
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  // Set a default key to prevent React warnings
  if (!properties.key) {
    properties.key = component;
    if (typeof component === 'function') {
      properties.key = component.displayName || 'customComponent';
    }
  }

  return React.createElement(component, properties, children);
}

function createTagFn(tag) {
  return function reactTag(properties, children) {
    return r(tag, properties, children);
  };
}

function isChildren(x) {
  return typeof x === 'string' || Array.isArray(x);
}
