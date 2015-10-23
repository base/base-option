/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';


module.exports = function option(app) {
  if (typeof app.option === 'function') {
    return option;
  }

  var Options = require('option-cache');
  this.options = this.options || {};
  Options.call(this, this.options);

  this.visit('mixin', Options.prototype);
  return option;
};
