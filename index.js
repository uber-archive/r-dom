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

  // Set the children onto the properties to avoid warnings
  // and increase performance
  properties.children = children;

  return React.createElement(component, properties);
}

// Wraps the classSet property value with React.addons.classSet
// and merge into className.
function processClasses(properties) {
  var classSet = properties.classSet;
  if (classSet) {
    var className = properties.className;
    if (className && typeof className === 'string') {
      var names = className.match(/\S+/g);

      if (names) {
        for (var i = 0; i < names.length; i++) {
          classSet[names[i]] = true;
        }
      }
    }

    properties.className = React.addons.classSet(classSet);
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
