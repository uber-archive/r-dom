'use strict';
var React = require('react');
var classSet = require('classnames');

module.exports = r;

// Export the React.DOM html tags
for (var domTag in React.DOM) {
  if (React.DOM.hasOwnProperty(domTag)) {
    r[domTag] = createTagFn(domTag);
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

// Wraps the classSet property value with React.addons.classSet
// and merge into className.
function processClasses(properties) {
  var classSetConfig = properties.classSet;
  if (classSetConfig) {
    var className = properties.className;
    if (className && typeof className === 'string') {
      var names = className.match(/\S+/g);

      if (names) {
        for (var i = 0; i < names.length; i++) {
          classSetConfig[names[i]] = true;
        }
      }
    }

    properties.className = classSet(classSetConfig);
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
