'use strict'

var http = require('http')
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

// This should be covered by the tests above, but since using this for HTTP is
// a very common use-case let's just have a specific test here as well
test('http requests', function (t) {
  t.plan(2)

  var server = http.createServer(function (req, res) {
    asyncState.req = req
    asyncState.res = res
    setTimeout(request, 50)
  })

  server.listen(function () {
    var port = server.address().port
    var url = 'http://localhost:' + port + '/'
    http.get(url + '1')
    http.get(url + '2')
    server.unref()
  })

  var request = function () {
    var req = asyncState.req
    var res = asyncState.res
    switch (req.url) {
      case '/1':
        t.ok(true)
        break
      case '/2':
        t.ok(true)
        break
      default:
        t.ok(false)
    }
    req.pipe(res)
  }
})
