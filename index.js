'use strict'

if (!process.addAsyncListener) require('async-listener')

var noop = function () {}

module.exports = function () {
  return new AsyncState()
}

function AsyncState () {
  var state = this

  process.addAsyncListener({
    create: asyncFunctionInitialized,
    before: asyncCallbackBefore,
    error: noop,
    after: asyncCallbackAfter
  })

  // Record the state currently set on on the async-state object and return a
  // snapshot of it. The returned object will later be passed as the `data`
  // arg in the functions below.
  function asyncFunctionInitialized () {
    var data = {}
    for (var key in state) {
      data[key] = state[key]
    }
    return data
  }

  // We just returned from the event-loop: We'll now restore the state
  // previously saved by `asyncFunctionInitialized`.
  function asyncCallbackBefore (context, data) {
    for (var key in data) {
      state[key] = data[key]
    }
  }

  // Clear the state so that it doesn't leak between isolated async stacks.
  function asyncCallbackAfter (context, data) {
    for (var key in state) {
      delete state[key]
    }
  }
}
