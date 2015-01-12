'use strict';
var React = require('react');
var classSet = require('react/lib/cx');

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

  if (properties.isRendered === false) {
    // React skips the component rendering if render() returns null.
    return null;
  }

  processClasses(properties);

  // Set the children onto the properties to avoid warnings
  // and increase performance
  properties.children = children;

  return React.createElement(component, properties);
}

// Wraps the className property value with React classSet if it's an object.
function processClasses(properties) {
  var className = properties.className;

  if (className && typeof className === 'object') {
    properties.className = classSet(className);
  }
}

function createTagFn(tag) {
  return function reactTag(properties, children) {
    return r(tag, properties, children);
  };
}

function isChildren(x) {
  return typeof x === 'string' || Array.isArray(x);
}
