/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base-methods');
var option = require('./');
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
    app.mixin('option', option);
    assert.equal(typeof App.prototype.option, 'function');
  });

  it('should set/get options on `app.options`', function () {
    app.mixin('option', option);
    app.option('a', 'b');
    assert.equal(app.options.a, 'b');
  });
});
