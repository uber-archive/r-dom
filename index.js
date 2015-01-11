'use strict';
var React = require('react/addons');

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

  var args = [component, properties];
  args = args.concat(children);

  return React.createElement.apply(React, args);
}

// Wraps the classSet property value with React.addons.classSet
// and assign to className.
function processClasses(properties) {
  if (properties.classSet) {
    properties.className = React.addons.classSet(properties.classSet);
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
