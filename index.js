'use strict';
var React = require('react');
var classSet = require('classnames');
var omit = require('object.omit');

module.exports = r;

// Export the React.DOM html tags
for (var domTag in React.DOM) {
  if (React.DOM.hasOwnProperty(domTag)) {
    r[domTag] = createTagFn(domTag);
  }
}

function r(component, properties, children) {
  // A properties object is optional so shift arguments if missing
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  properties = properties || {};

  if (properties.isRendered !== undefined && !properties.isRendered) {
    // React skips the component rendering if render() returns null.
    return null;
  }

  processClasses(properties);

  // Don't use an array if there's only one child
  if (Array.isArray(children) && children.length === 1) {
    children = children[0];
  }

  var props = omit(properties, ['classSet', 'isRendered']);

  // When there's only one child, call createElement normally
  // to achieve a minor performance gain
  if (!Array.isArray(children)) {
    return React.createElement(component, props, children);
  }

  // When many children, use apply to prevent unnecessary key warnings
  var args = createArguments(component, props, children);
  return React.createElement.apply(React, args);
}

// Wraps the classSet property value with React.addons.classSet
// and merge into className.
function processClasses(properties) {
  var classSetConfig = properties.classSet;
  if (!classSetConfig) {
    return;
  }

  var className = properties.className;
  if (className && typeof className === 'string') {
    var names = className.match(/\S+/g);
    if (!names) {
      return;
    }

    for (var i = 0; i < names.length; i++) {
      classSetConfig[names[i]] = true;
    }
  }

  properties.className = classSet(classSetConfig);
}

// Creates an array of React.createElement arguments in a performant way
function createArguments(component, properties, children) {
  var argLength = children.length + 2;
  var args = new Array(argLength);

  args[0] = component;
  args[1] = properties;
  for (var i = 0; i < children.length; i++) {
    var argsIndex = i + 2;
    args[argsIndex] = children[i];
  }

  return args;
}

function createTagFn(tagName) {
  return function reactTag(properties, children) {
    return r(tagName, properties, children);
  };
}

function isChildren(x) {
  return typeof x === 'string' || typeof x === 'number' || Array.isArray(x);
}
