# async-state

Parse state across async callbacks.

[![Build status](https://travis-ci.org/watson/async-state.svg?branch=master)](https://travis-ci.org/watson/async-state)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install async-state
```

## Usage

```js
var asyncState = require('async-state')()

asyncState.foo = 'foo'

setTimeout(function () {
  console.log(asyncState.foo) // => foo
}, 2000)

asyncState.foo = 'bar'
```

This also works between files. For a more complex example, see the
[example
folder](https://github.com/watson/async-state/tree/master/example).

## Gotchas

Only object references are copied across async bounderies. The content
of the object is shared! I.e. the following will get you into trouble:

```js
var asyncState = require('async-state')()

asyncState.obj = { foo: 'foo' }

setTimeout(function () {
  console.log(asyncState.obj.foo) // => bar
}, 2000)

// THIS IS BAD!
asyncState.obj.foo = 'bar'
```

To solve that issue, implement your own cloning logic:

```js
var asyncState = require('async-state')()

asyncState.obj = { foo: 'foo' }

setTimeout(function () {
  console.log(asyncState.obj.foo) // => foo
}, 2000)

// THIS IS GOOD :)
asyncState.obj = { foo: 'bar' }
```

## Credits

Thanks to [Andreas Madsen](https://github.com/AndreasMadsen) for pointing me towards the `async_wrap` API.

## License

MIT
