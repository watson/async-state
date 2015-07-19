'use strict'

module.exports = new AsyncState()

function AsyncState () {
  var tracing
  var state = this
  var noop = function () {}

  try {
    tracing = require('tracing')
  } catch (e) {
    tracing = require('./tracing_polyfill.js')
  }

  tracing.addAsyncListener({
    'create': asyncFunctionInitialized,
    'before': asyncCallbackBefore,
    'error': noop,
    'after': noop
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
}
