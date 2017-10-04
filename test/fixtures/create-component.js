'use strict';
var extend = require('xtend');
var createReactClass = require('create-react-class');
var DOM = require('react-dom-factories');

var r = require('../../');

module.exports = createComponent;

function createComponent(properties) {
  properties = extend({
    render: function render() {
      return (
        r.div([
          r.h1(this.props.title),
          // This tests that children are passed down correctly to
          // components that use React.DOM directly (and don't warn)
          DOM.div(null, this.props.children)
        ])
      );
    }
  }, properties);

  return createReactClass(properties);
}
