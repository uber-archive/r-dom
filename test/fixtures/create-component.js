'use strict';
var extend = require('xtend');
var React = require('react');

var r = require('../../');

module.exports = createComponent;

function createComponent(properties) {
  properties = extend({
    render: function render() {
      return (
        r.div([
          r.h1(this.props.title),
          this.props.children
        ])
      );
    }
  }, properties);

  return React.createClass(properties);
}
