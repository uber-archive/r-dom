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
  componentWithUnrenderedChild: {
    html: '<div><h1></h1><div><span></span></div></div>',
    dom: (
      r(Component, [
        r.span(),
        r.div({isRendered: false}, 'Should not show up')
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
