'use strict';

var test = require('tape');
var React = require('react');
var r = require('../');

var name = 'name';
var id = 1455;
var valid = true;

function text(value) {
  return value ? String(value) : '';
}

function createChildComponent() {
  return React.createClass({
    propTypes: {
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      valid: React.PropTypes.bool
    },

    render: function render() {
      return r.div([
        text(this.props.id),
        text(this.props.name),
        text(this.props.valid)
      ]);
    }
  });
}

function checkParentRendering(assert, ParentComponent, values, message) {
  var renderedHtml = React.renderToStaticMarkup(r(ParentComponent, {
    id: id,
    name: name,
    valid: valid
  }));

  var expected = '<div>' + values.join('') + '</div>';
  assert.equal(renderedHtml, expected, message);
}

test('Test property inheritance with empty properties.', function t(assert) {
  assert.plan(1);

  var Parent = React.createClass({
    render: function render() {
      return r(createChildComponent(), {
        inheritProps: this.props
      });
    }
  });

  var renderedHtml = React.renderToStaticMarkup(r(Parent));
  var expected = '<div></div>';
  assert.equal(expected, renderedHtml,
    'Empty properties should not break property inheritance.');
});

test('Test basic property inheritance.', function t(assert) {
  assert.plan(1);

  var Parent = React.createClass({
    render: function render() {
      return r(createChildComponent(), {
        inheritProps: this.props
      });
    }
  });

  checkParentRendering(assert, Parent, [id, name, valid],
    'Component rendered properly with basic property inheritance.');
});

test('Test property inheritance with includes.', function t(assert) {
  assert.plan(1);

  var Parent = React.createClass({
    render: function render() {
      return r(createChildComponent(), {
        inheritProps: {
          props: this.props,
          includes: ['id', 'name']
        }
      });
    }
  });

  checkParentRendering(assert, Parent, [id, name],
    'Component rendered properly with property inheritance includes.');
});

test('Test property inheritance with excludes.', function t(assert) {
  assert.plan(1);

  var Parent = React.createClass({
    render: function render() {
      return r(createChildComponent(), {
        inheritProps: {
          props: this.props,
          excludes: ['id']
        }
      });
    }
  });

  checkParentRendering(assert, Parent, [name, valid],
    'Component rendered properly with property inheritance excludes.');
});

test('Test conflicting property names.', function t(assert) {
  assert.plan(1);

  var childId = 685;
  var childName = 'child';

  var Parent = React.createClass({
    render: function render() {
      return r(createChildComponent(), {
        inheritProps: this.props,
        id: childId,
        name: childName
      });
    }
  });

  checkParentRendering(assert, Parent, [childId, childName, valid],
    'Component rendered properly without explicit properties overriden.');
});
