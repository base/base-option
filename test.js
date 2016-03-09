'use strict';

require('mocha');
var Base = require('base');
var assert = require('assert');
var plugins = require('base-plugins');
var options = require('./');
var app;

describe('option', function() {
  beforeEach(function() {
    app = new Base();
    app.use(options());
  });

  describe('method', function() {
    it('should add the option method to the `app` instance:', function() {
      assert.equal(typeof app.option, 'function');
    });

    it('should not add the option method to the `Base` prototype:', function() {
      assert.notEqual(typeof Base.prototype.option, 'function');
    });
  });

  describe('plugin', function() {
    it('should add options passed to the plugin', function() {
      app = new Base();
      app.use(options({z: 'y'}));
      assert.equal(app.options.z, 'y');
    });

    it('should pass the plugin to "run" when the `plugins` plugin is used', function() {
      app = new Base();
      app.use(plugins());
      app.use(options());
      assert(app.fns.length === 1);
    });

    it('should pass the plugin to "run" when {run:false} is defined', function() {
      app.use(plugins());
      app.use(options({run: false}));
      assert(app.fns.length === 0);
    });

    it('should not overwrite existing options', function() {
      app.options.foo = 'bar';
      app.use(options());
      app.option('a', 'b');
      assert.equal(app.options.foo, 'bar');
      assert.equal(app.options.a, 'b');
    });

    it('should set options as key-value pairs', function() {
      app.option('a', 'b');
      assert.equal(app.options.a, 'b');
    });

    it('should set an object', function() {
      app.option({c: 'd'});
      var c = app.option('c');
      assert.equal(c, 'd');
    });

    it('should get options', function() {
      app.option('a', 'b');
      var a = app.option('a');
      assert.equal(a, 'b');
    });

    it('should return true if an option exists', function() {
      app.option('a', 'b');
      assert(app.hasOption('a'));
    });

    it('should enable an option', function() {
      assert(!app.options.a);
      app.enable('a');
      assert(app.options.a);
    });

    it('should disable an option', function() {
      app.enable('a');
      assert(app.options.a);
      app.disable('a');
      assert(!app.options.a);
    });

    it('should set nested options', function() {
      app.option('a.b.c', 'd');
      assert.deepEqual(app.options.a, {b: {c: 'd'}});
    });

    it('should get nested options', function() {
      app.option('a.b.c', 'd');
      assert.deepEqual(app.option('a'), {b: {c: 'd'}});
      assert.deepEqual(app.option('a.b'), {c: 'd'});
      assert.deepEqual(app.option('a.b.c'), 'd');
    });

    it('should throw an error when key is null', function(cb) {
      try {
        app.option(null);
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert(err.message === 'expected option to be a string, object or array');
        cb();
      }
    });

    it('should throw an error when key is not a string or object', function(cb) {
      try {
        app.option(9);
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert(err.message === 'expected option to be a string, object or array');
        cb();
      }
    });
  });

  describe('option.set', function() {
    beforeEach(function() {
      app = new Base();
      app.use(options());
    });

    it('should set a key-value pair on app.options', function() {
      app.option.set('a', 'b');
      app.option.set('c', 'd');
      assert.equal(app.options.a, 'b');
      assert.equal(app.options.c, 'd');
    });
  });

  describe('option.get', function() {
    beforeEach(function() {
      app = new Base();
      app.use(options());
    });

    it('should get a key-value pair from app.options', function() {
      app.option.set('a', 'b');
      app.option.set('c', 'd');
      assert.equal(app.option.get('a'), 'b');
      assert.equal(app.option.get('c'), 'd');
    });
  });

  describe('option.create', function() {
    beforeEach(function() {
      app = new Base();
      app.use(options());
    });

    it('should clone options', function() {
      app.option({a: 'b', c: 'd'});
      var opts = app.option.create();
      app.option({e: 'f'});
      assert.equal(opts.a, 'b');
      assert.equal(opts.c, 'd');
      assert.equal(typeof opts.e, 'undefined');
    });

    it('should expose a set method', function() {
      app.option({a: 'b', c: 'd'});
      var opts = app.option.create();

      opts.set('e', 'f');
      opts.set('g', 'h');
      assert.equal(opts.a, 'b');
      assert.equal(opts.c, 'd');
      assert.equal(opts.e, 'f');
      assert.equal(opts.g, 'h');
    });

    it('should expose a get method', function() {
      app.option({a: 'b', c: 'd'});
      var opts = app.option.create();

      opts.set('e', 'f');
      opts.set('g', 'h');

      assert.equal(opts.get('a'), 'b');
      assert.equal(opts.get('c'), 'd');
      assert.equal(opts.get('e'), 'f');
      assert.equal(opts.get('g'), 'h');
    });

    it('should expose a merge method', function() {
      app.option({a: 'b', c: 'd'});
      var opts = app.option.create();

      opts.merge({e: 'f'}, {g: 'h'});
      assert.equal(opts.a, 'b');
      assert.equal(opts.c, 'd');
      assert.equal(opts.e, 'f');
      assert.equal(opts.g, 'h');
    });
  });
});
