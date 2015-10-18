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
    app.use(options);
  });

  it('should add the option method to the `app` prototype:', function () {
    assert.equal(typeof App.prototype.option, 'function');
  });

  it('should set options as key-value pairs', function () {
    app.option('a', 'b');
    assert.equal(app.options.a, 'b');
  });

  it('should set an object', function () {
    app.option({c: 'd'});
    var c = app.option('c');
    assert.equal(c, 'd');
  });

  it('should get options', function () {
    app.option('a', 'b');
    var a = app.option('a');
    assert.equal(a, 'b');
  });

  it('should return true if an option exists', function () {
    app.option('a', 'b');
    assert(app.hasOption('a'));
  });

  it('should enable an option', function () {
    assert(!app.options.a);
    app.enable('a');
    assert(app.options.a);
  });

  it('should disable an option', function () {
    app.enable('a');
    assert(app.options.a);
    app.disable('a');
    assert(!app.options.a);
  });

  it('should set nested options', function () {
    app.option('a.b.c', 'd');
    assert.deepEqual(app.options.a, {b: {c: 'd'}});
  });

  it('should get nested options', function () {
    app.option('a.b.c', 'd');
    assert.deepEqual(app.option('a'), {b: {c: 'd'}});
    assert.deepEqual(app.option('a.b'), {c: 'd'});
    assert.deepEqual(app.option('a.b.c'), 'd');
  });

  it('should throw an error when key is null', function (done) {
    try {
      app.option(null);
      done(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert(err.message === 'expected option to be a string, object or array');
      done();
    }
  });

  it('should throw an error when key is not a string or object', function (done) {
    try {
      app.option(9);
      done(new Error('expected an error'));
    } catch(err) {
      assert(err);
      assert(err.message === 'expected option to be a string, object or array');
      done();
    }
  });
});
