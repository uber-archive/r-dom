'use strict';
var React = require('react');
var classSet = require('react/lib/cx');
var window = require('global/window');

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
  processPropertyInheritance(properties);

  // Don't use an array if there's only one child
  if (Array.isArray(children) && children.length === 1) {
    children = children[0];
  }

  // When there's only one child, call createElement normally
  // to achieve a minor performance gain
  if (!Array.isArray(children)) {
    return React.createElement(component, properties, children);
  }

  // When many children, use apply to prevent unnecessary key warnings
  var args = createArguments(component, properties, children);
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

// Processes the property inheritance.
// The inheritProps property could take this.props from the parent component,
// or a config object that specifies properties to include / exludes.
function processPropertyInheritance(properties) {
  var inheritProps = properties.inheritProps;
  if (!inheritProps) {
    return;
  }

  var sourceProps;

  if (inheritProps.props) {
    sourceProps = inheritProps.props;

    if (Array.isArray(inheritProps.includes)) {
      inheritProps.includes.forEach(function forEach(propName) {
        assignProperty(sourceProps, properties, propName);
      });
    } else if (Array.isArray(inheritProps.excludes)) {
      Object.keys(sourceProps).forEach(function forEach(propName) {
        if (inheritProps.excludes.indexOf(propName) === -1) {
          assignProperty(sourceProps, properties, propName);
        }
      });
    }
  } else {
    sourceProps = inheritProps;
    Object.keys(sourceProps).forEach(function forEach(propName) {
      assignProperty(sourceProps, properties, propName);
    });
  }
}

// Assigns the property specified by name from the source to the target.
// A warning is thrown if the property with the same name already exists.
function assignProperty(sourceProps, targetProps, propName) {
  if (propName in targetProps) {
    var warning = ['Property', propName,
      'already exits in the target properties.'].join(' ');
    window.console.warn(warning);
  } else {
    targetProps[propName] = sourceProps[propName];
  }
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
  return typeof x === 'string' || Array.isArray(x);
}
