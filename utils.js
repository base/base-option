'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
require('option-cache', 'Options');
require('define-property', 'define');
require('mixin-deep', 'merge');
require('get-value', 'get');
require('set-value', 'set');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
