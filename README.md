# r-dom [![Build Status](https://travis-ci.org/uber/r-dom.svg?branch=master)](https://travis-ci.org/uber/r-dom)

React DOM wrapper.

## Usage

```js
var React = require('react');
var r = require('r-dom');

var AnotherComponent = require('./another-component');

module.exports = React.createClass({
  render: function render() {
    return (
      r.div({className: 'example'}, [
        r.h1('Hello World!'),
        r.h2('This is React.js markup'),
        r(AnotherComponent, {foo: 'bar'}),
        r.div({
          classSet: { // Automatically use `classnames` module for classSet
            foo: this.props.foo,
            bar: this.props.bar
          },
          isRendered: this.props.foo // div won't render if isRendered is falsy
        })
      ])
    );
  }
});
```

## Documentation

#### `r[tag]([properties], [children])`

Returns a React element

- **tag** `String` - A React.DOM tag string
- **properties** `Object` *optional* - An object containing the properties you'd like to set on the element.
- **children** `Array|String` *optional* - An array of `r` children or a string. This will create child elements or a text node, respectively. 

#### `r(component, [properties], [children])`

Returns a React element

- **component** `Function` - A React.js Component class created with `React.createClass`
- **properties** `Object` *optional* - An object containing the properties you'd like to set on the element.
- **children** `Array|String` *optional* - An array of `r` children or a string. This will create child elements or a text node, respectively. 

#### Special Properties

- **isRendered** `"Boolean"` *optional* - If falsy, React will skip rendering the target component.
- **classSet** `Object` *optional* - Apply [classnames](https://www.npmjs.com/package/classnames) and assign to className.
