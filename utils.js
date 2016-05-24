'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Module dependencies
 */

require('define-property', 'define');
require('get-value', 'get');
require('is-registered');
require('isobject', 'isObject');
require('mixin-deep', 'merge');
require('option-cache', 'Options');
require('set-value', 'set');
require = fn;

/**
 * Return true if app is a valid instance
 */

utils.isValid = function(app) {
  if (!utils.isObject(app)) {
    return false;
  }

  if (typeof app.option === 'function') {
    return false;
  }

  if (utils.isRegistered(app, 'base-option')) {
    return false;
  }
  return true;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
