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
    var data = {}
    for (var key in state) {
      data[key] = state[key]
    }
    return data
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
