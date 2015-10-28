/*!
 * base-options <https://github.com/jonschlinkert/base-options>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';


module.exports = function option(app) {
  var Options = require('option-cache');

  this.options = this.options || {};
  Options.call(this, this.options);

  this.visit('define', Options.prototype);
  return option;
};
