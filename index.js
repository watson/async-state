'use strict'

require('async-listener')

var deepExtend = require('deep-extend')

module.exports = new AsyncState()

function AsyncState () {
  var state = this

  process.addAsyncListener({
    'create': asyncFunctionInitialized,
    'before': asyncCallbackBefore,
    'error': function () {},
    'after': asyncCallbackAfter
  })

  function asyncFunctionInitialized () {
    // Record the state currently set on on the async-state object and return a
    // snapshot of it. The returned object will later be passed as the `data`
    // arg in the functions below.

    return deepExtend({}, state)
  }

  function asyncCallbackBefore (context, data) {
    // We just returned from the event-loop: We'll now restore the state
    // previously saved by `asyncFunctionInitialized`.

    deepExtend(state, data)
  }

  function asyncCallbackAfter (context, data) {
    // Clear the state so that it doesn't leak between isolated async stacks.

    for (var key in state) {
      delete state[key]
    }
  }
}
