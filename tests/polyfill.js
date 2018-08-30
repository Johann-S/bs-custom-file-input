(function () {
  var mochaFixtureDiv = document.createElement('div')
  mochaFixtureDiv.setAttribute('id', 'mocha-fixture')
  document.body.appendChild(mochaFixtureDiv)

  // Polyfill new File()
  try {
    new File([], 'test.txt')
  }
  catch(e) {
    // Fake polyfill for IE or Edge...
    window.File = function (part, name) {
      return {
        part: part,
        name: name,
      }
    }
  }

  // Event constructor shim
  if (!window.Event || typeof window.Event !== 'function') {
    var origEvent = window.Event
    window.Event = function(inType, params) {
      params = params || {}
      var e = document.createEvent('Event')
      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable))
      return e
    }
    window.Event.prototype = origEvent.prototype
  }
})()
