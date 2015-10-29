/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(options) {
  var Options = require('option-cache');
  var extend = require('extend-shallow');

  return function fn(app) {
    this.options = extend({}, options, this.options, {});
    Options.call(this, this.options);
    this.visit('define', Options.prototype);
    return fn;
  };
};
