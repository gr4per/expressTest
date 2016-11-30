var assert = require('assert')
var app = require('./../app')

describe('app', function () {
  describe('someFunction', function () {
    it('should return its input', function () {
      var ip = "testText"
      var s = app.someFunction(ip)
      assert.equal(ip, s)
    })
  })
})

