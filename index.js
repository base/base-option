/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Options = require('option-cache');
var extend = require('extend-shallow');

module.exports = function(options) {
  // shallow clone options
  var opts = extend({}, options);

  return function fn(app) {
    // original constructor reference
    var ctor = this.constructor;

    this.options = extend({}, opts, this.options);
    Options.call(this, this.options);
    this.visit('define', Options.prototype);

    // restore original constructor
    this.constructor = ctor;

    // prevent the plugin from
    //  being passed to `run`
    if (opts.run !== false) {
      return fn;
    }
  };
};
