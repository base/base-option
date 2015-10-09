'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base-methods');
var options = require('./');
var App, app;

describe('option', function () {
  beforeEach(function() {
    App = function() {
      Base.call(this);
    };
    Base.extend(App);
    app = new App();
  });

  it('should add the option method to the `app` prototype:', function () {
    app.use(options);
    assert.equal(typeof App.prototype.option, 'function');
  });

  it('should set options', function () {
    app.use(options);
    app.option('a', 'b');
    assert.equal(app.options.a, 'b');
  });

  it('should get options', function () {
    app.use(options);
    app.option('a', 'b');
    var a = app.option('a');
    assert.equal(a, 'b');
  });

  it('should set an object', function () {
    app.use(options);
    app.option({c: 'd'});
    var c = app.option('c');
    assert.equal(c, 'd');
  });

  it('should throw an error when key is falsey', function (done) {
    try {
      app.use(options);
      app.option(null);
      done(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert(err.message === 'expected a string or object.');
      done();
    }
  });

  it('should throw an error when key is not a string or object', function (done) {
    try {
      app.use(options);
      app.option(9);
      done(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert(err.message === 'expected a string or object.');
      done();
    }
  });
});
