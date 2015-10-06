/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function option(app) {
  app.mixin('option', function(key, value) {
    this.options = this.options || {};

    if (typeof key === 'string') {
      if (arguments.length === 1) {
        return utils.get(this.options, key);
      }
      utils.set(this.options, key, value);
      this.emit('option', key, value);
      return this;
    }

    if (key == null || typeof key !== 'object') {
      throw new TypeError('expected a string or object.');
    }

    this.visit('option', key);
    return this;
  });
};
