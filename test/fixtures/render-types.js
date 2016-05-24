'use strict';
var createComponent = require('./create-component');
var r = require('../../');

var Component = createComponent();

module.exports = {
  tag: {
    html: '<div></div>',
    dom: r.div()
  },
  tagWithChildren: {
    html: '<div><h1>Hello World</h1></div>',
    dom: (
      r.div([
        r.h1('Hello World')
      ])
    )
  },
  tagWithPropsAndChildren: {
    html: '<div class="foo"><h1>Hello World</h1></div>',
    dom: (
      r.div({className: 'foo'}, [
        r.h1('Hello World')
      ])
    )
  },
  tagWithAnIntegerAsChildren: {
    html: '<div><h1>12345</h1></div>',
    dom: (
      r.div([
        r.h1(12345)
      ])
    )
  },
  tagWithAFloatAsChildren: {
    html: '<div><h1>123.45</h1></div>',
    dom: (
      r.div([
        r.h1(123.45)
      ])
    )
  },
  tagWithZeroAsChildren: {
    html: '<div><h1>0</h1></div>',
    dom: (
      r.div([
        r.h1(0)
      ])
    )
  },
  tagWithNullProps: {
    html: '<div><h1>Foo</h1></div>',
    dom: (
      r.div(null, [
        r.h1('Foo')
      ])
    )
  },
  component: {
    html: '<div><h1></h1><div></div></div>',
    dom: (
      r(Component)
    )
  },
  componentWithChildren: {
    html: '<div><h1></h1><div><span>A child</span></div></div>',
    dom: (
      r(Component, [
        r.span('A child')
      ])
    )
  },
  componentWithPropsAndChildren: {
    html: '<div><h1>Hello World</h1><div><span>A child</span></div></div>',
    dom: (
      r(Component, {title: 'Hello World'}, [
        r.span('A child')
      ])
    )
  },
  componentWithUnrenderedChildWithFalse: {
    html: '<div><h1></h1><div><span></span></div></div>',
    dom: (
      r(Component, [
        r.span(),
        r.div({isRendered: false}, 'Should not show up')
      ])
    )
  },
  componentWithUnrenderedChildWithFalsy: {
    html: '<div><h1></h1><div><span></span></div></div>',
    dom: (
      r(Component, [
        r.span(),
        r.div({isRendered: 0}, 'Should not show up')
      ])
    )
  },
  componentWithRenderedChildWithTruth: {
    html: '<div><h1></h1><div><span></span><div>show up</div></div></div>',
    dom: (
      r(Component, [
        r.span(),
        r.div({isRendered: true}, 'show up')
      ])
    )
  },
  componentWithRenderedChildWithTruthy: {
    html: '<div><h1></h1><div><span></span><div>show up</div></div></div>',
    dom: (
      r(Component, [
        r.span(),
        r.div({isRendered: 1}, 'show up')
      ])
    )
  },
  componentWithClassset: {
    html: '<div><h1></h1><div><div class="class1 class2"></div></div></div>',
    dom: (
      r(Component, [
        r.div({
          classSet: {
            class1: true,
            class2: true,
            class3: false
          }
        })
      ])
    )
  },
  componentWithDynamicClassNames: {
    html: '<div><h1></h1><div><div class="class1 class3 class4"></div></div>' +
      '</div>',
    dom: (
      r(Component, [
        r.div({
          className: ' class3 class4  ',
          classSet: {
            class1: true,
            class2: false,
            class3: false
          }
        })
      ])
    )
  }
};
