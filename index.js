'use strict'

module.exports = new AsyncState()

function AsyncState () {
  var tracing
  var state = this

  try {
    tracing = require('tracing')
  } catch (e) {
    tracing = require('./lib/tracing_polyfill.js')
  }

  tracing.addAsyncListener({
    'create': asyncFunctionInitialized,
    'before': asyncCallbackBefore,
    'error': function () {},
    'after': asyncCallbackAfter
  })

  function asyncFunctionInitialized () {
    var result = {}
    for (var key in state) {
      result[key] = state[key]
    }
    return result
  }

  function asyncCallbackBefore (context, data) {
    for (var key in data) {
      state[key] = data[key]
    }
  }

  function asyncCallbackAfter (context, data) {
    for (var key in state) {
      delete state[key]
    }
  }
}
