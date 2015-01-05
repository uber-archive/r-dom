'use strict';
var forEach = require('for-each');
var React = require('react');
var test = require('tape');

var createComponent = require('./fixtures/create-component');
var r = require('../');
var renderTypes = require('./fixtures/render-types');

test('Tags and components rendered with different args', function t(assert) {
  assert.plan(Object.keys(renderTypes).length);

  forEach(renderTypes, function renderCorrectly(data, name) {
    assert.equal(getDOMString(data.dom), data.html,
      '`' + name + '` renders correctly');
  });
});

test('An html tag', function t(assert) {
  assert.plan(2);

  var div = r.div();

  assert.ok(div, 'create an element');
  assert.equal(React.Children.count(div.props.children), 0, 'has no children');
});

test('An html tag with a key property and a child', function t(assert) {
  assert.plan(2);

  var div = r.div({key: 'someKey'}, [r.span('span')]);

  assert.equal(div.key, 'someKey',
    'uses the passed key property');
  assert.equal(React.Children.count(div.props.children), 1, 'has one child');
});

test('A component', function t(assert) {
  assert.plan(1);

  var component = r(createComponent());

  assert.ok(component, 'create an element from a component');
});

test('A component with a key property and a child', function t(assert) {
  assert.plan(1);

  var component = r(createComponent(), {key: 'someKey'});

  assert.equal(component.key, 'someKey',
    'uses the passed key property');
});

function getDOMString(reactElement) {
  return React.renderToStaticMarkup(reactElement);
}
