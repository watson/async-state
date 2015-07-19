'use strict'

var assert = require('assert')
var asyncState = require('./')

// 1) set to 'foo'
asyncState.foo = 'foo'

process.nextTick(function () {
  // 3) test for 'foo'
  assert.equal(asyncState.foo, 'foo')
})

// 2) set to 'bar'
asyncState.foo = 'bar'

setTimeout(function () {
  // 4) test for 'bar'
  assert.equal(asyncState.foo, 'bar')
}, 50)
