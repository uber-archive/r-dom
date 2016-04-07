'use strict';
var console = require('console');
var forEach = require('for-each');
var ReactDOM = require('react-dom/server');
var test = require('tape');

var createComponent = require('./fixtures/create-component');
var r = require('../');
var renderTypes = require('./fixtures/render-types');

test('Tags and components rendered with different args', function t(assert) {
  forEach(renderTypes, function renderCorrectly(data, name) {
    var dom;
    var messages = catchWarns(function makeDomString() {
      dom = getDOMString(data.dom);
    });

    assert.equal(messages.length, 0,
      '`' + name + '` does not log warnings');

    assert.equal(dom, data.html,
      '`' + name + '` renders correctly');
  });
  assert.end();
});

test('An html tag', function t(assert) {
  var div = r.div();
  assert.ok(div,
    'creates an element');
  assert.end();
});

test('An html tag with a key property', function t(assert) {
  var div = r.div({key: 'someKey'});
  assert.equal(div.key, 'someKey',
    'uses the passed key property');
  assert.end();
});

test('A component', function t(assert) {
  var component = r(createComponent());
  assert.ok(component,
    'creates an element');
  assert.end();
});

test('A component with a key property', function t(assert) {
  var component = r(createComponent(), {key: 'someKey'});
  assert.equal(component.key, 'someKey',
    'uses the passed key property');
  assert.end();
});

function getDOMString(reactElement) {
  return ReactDOM.renderToStaticMarkup(reactElement);
}

function catchWarns(fn) {
  var messages = [];

  /* eslint-disable no-console */
  var originalWarn = console.warn;
  console.warn = warn;
  fn();
  console.warn = originalWarn;
  /* esline-enable no-console */

  return messages;

  function warn(message) {
    messages.push(message);
  }
}
