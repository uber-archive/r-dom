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
  assert.plan(1);

  var div = r.div();

  assert.equal(div.key, 'div',
    'sets a default key property');
});

test('An html tag with a key property', function t(assert) {
  assert.plan(1);

  var div = r.div({key: 'someKey'});

  assert.equal(div.key, 'someKey',
    'uses the passed key property');
});

test('A component', function t(assert) {
  assert.plan(1);

  var component = r(createComponent());

  assert.equal(component.key, 'customComponent',
    'sets a default key property');
});

test('A component with a displayName', function t(assert) {
  assert.plan(1);

  var component = r(createComponent({displayName: 'fooBar'}));

  assert.equal(component.key, 'fooBar',
    'uses the displayName for the key property');
});

test('A component with a key property', function t(assert) {
  assert.plan(1);

  var component = r(createComponent(), {key: 'someKey'});

  assert.equal(component.key, 'someKey',
    'uses the passed key property');
});

function getDOMString(reactElement) {
  return React.renderToStaticMarkup(reactElement);
}
