# Changelog

## `v1.1.0`

Use `classnames` instead of React's `classSet`

## `v1.0.2`

Fix a bug whereby classSet would not apply if className was empty.

## `v1.0.1`

Pass children as arguments to `React.createElement`. Fixes an issue whereby third-party components that used `React.DOM` directly and passed in `this.props.children` would create unnecessary key warnings.

## `v1.0.0`

Initial version
