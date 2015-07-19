# async-state

Parse state across async callbacks.

[![Build status](https://travis-ci.org/watson/async-state.svg?branch=master)](https://travis-ci.org/watson/async-state)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Prerequisites

io.js or Node.js v0.11.12 or above.

## Installation

```
npm install async-state
```

## Usage

```js
var asyncState = require('async-state')

asyncState.foo = 'foo'

setTimeout(function () {
  console.log(asyncState.foo) // => foo
}, 2000)

asyncState.foo = 'bar'
```

This also works between files. For a more complex example, see the
[example
folder](https://github.com/watson/async-state/tree/master/example).

## Credits

Thanks to [Andreas Madsen](https://github.com/AndreasMadsen) for pointing me towards the `async_wrap` API. The `tracing_polyfill.js` file have been lifted from his super fast [trace module](https://github.com/AndreasMadsen/trace).

## License

MIT
