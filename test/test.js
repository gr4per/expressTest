var assert = require('assert')
var app = require('./../app')

describe('app', function () {
  it('should return title expressTest', function () {
    assert.equal('expressTest', app.locals.title)
  })
})

