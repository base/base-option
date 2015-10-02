'use strict';

/**
 * Lazily required module dependencies
 */

var lazy = require('lazy-cache')(require);
var fn = require;

require = lazy;
require('set-value', 'set');
require('get-value', 'get');
require = fn;

/**
 * Expose `lazy` modules
 */

module.exports = lazy;
