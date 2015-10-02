/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(key, value) {
  this.options = this.options || {};

  if (typeof key === 'string') {
    if (arguments.length === 1) {
      return this.get('options.' + key);
    }
    this.set('options.' + key, value);
    this.emit('option', key, value);
    return this;
  }
  if (typeof key !== 'object') {
    throw new TypeError('expected a string or object.');
  }

  this.visit('option', key);
  return this;
};
