var http = require('http')
var asyncState = require('async-state')
var worker = require('./worker')

// start an HTTP server
var server = http.createServer(function (req, res) {
  // every time the server receives a new request, store it on the async-state
  asyncState.req = req

  // call an async function
  worker()
})

server.listen(3000)
