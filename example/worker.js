var asyncState = require('async-state')

process.on('uncaughtException', function (err) {
  // output the URL for the HTTP request that caused the error
  console.log('An error occurred for: ' + asyncState.req.url)
  process.exit(1)
})

module.exports = function () {
  setTimeout(function () {
    throw new Error('foo')
  }, 2000)
}
