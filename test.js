'use strict'

var test = require('tape')
var asyncState = require('./')

test('restore state', function (t) {
  t.plan(2)

  // 1) set to 'foo'
  asyncState.foo = 'foo'

  process.nextTick(function () {
    // 3) test for 'foo'
    t.equal(asyncState.foo, 'foo')
  })

  // 2) set to 'bar'
  asyncState.foo = 'bar'

  setTimeout(function () {
    // 4) test for 'bar'
    t.equal(asyncState.foo, 'bar')
  }, 50)
})

test('isolation', function (t) {
  t.plan(2)

  var done = function () {
    // 3) test for 'bar'
    t.equal(asyncState.bar, 'bar')
  }

  process.nextTick(function () {
    // 1) set to 'bar'
    asyncState.bar = 'bar'
    setTimeout(done, 100)
  })

  setTimeout(function () {
    // 2) test for undefined
    t.equal(asyncState.bar, undefined)
  }, 50)
})

test('restore object state', function (t) {
  t.plan(2)

  // 1) set to 'foo'
  asyncState.obj1 = { x: 'foo' }

  process.nextTick(function () {
    // 3) test for 'foo'
    t.equal(asyncState.obj1.x, 'foo')
  })

  // 2) set to 'bar'
  asyncState.obj1.x = 'bar'

  setTimeout(function () {
    // 4) test for 'bar'
    t.equal(asyncState.obj1.x, 'bar')
  }, 50)
})

test('object isolation', function (t) {
  t.plan(2)

  asyncState.obj2 = {}

  var done = function () {
    // 3) test for 'bar'
    t.equal(asyncState.obj2.x, 'bar')
  }

  process.nextTick(function () {
    // 1) set to 'bar'
    asyncState.obj2.x = 'bar'
    setTimeout(done, 100)
  })

  setTimeout(function () {
    // 2) test for undefined
    t.equal(asyncState.obj2.x, undefined)
  }, 50)
})
