/*!
 * base-option <https://github.com/node-base/base-option>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(options) {
  return function fn(app) {
    if (this.isRegistered('base-options')) return;
    var Options = utils.Options;
    var define = utils.define;
    var set = utils.set;
    var get = utils.get;

    // shallow clone options
    var opts = utils.merge({}, options);
    var self = this;

    // original constructor reference
    var ctor = this.constructor;
    Options.call(this, utils.merge(this.options, opts));

    this.visit('define', Options.prototype);

    /**
     * Set option `key` on `app.options` with the given `value`
     * ```js
     * app.option.set('a', 'b');
     * console.log(app.option.get('a'));
     * //=> 'b'
     * ```
     * @name .option.set
     * @param {String} `key` Option key, dot-notation may be used.
     * @param {any} `value`
     * @api public
     */

    define(this.option, 'set', function(key, val) {
      set(self.options, key, val);
      return self.options;
    });

    /**
     * Get option `key` from `app.options`
     *
     * ```js
     * app.option({a: 'b'});
     * console.log(app.option.get('a'));
     * //=> 'b'
     * ```
     * @name .option.get
     * @param {String} `key` Option key, dot-notation may be used.
     * @return {any}
     * @api public
     */

    define(this.option, 'get', function(key) {
      return get(self.options, key);
    });

    /**
     * Returns a shallow clone of `app.options` with all of the options methods, as
     * well as a `.merge` method for merging options onto the cloned object.
     *
     * ```js
     * var opts = app.option.create();
     * opts.merge({foo: 'bar'});
     * ```
     * @name .option.create
     * @param {Options} `options` Object to merge onto the returned options object.
     * @return {Object}
     * @api public
     */

    define(this.option, 'create', function(options) {
      var opts = new Options(utils.merge({}, self.options));
      define(opts, 'merge', opts.option.bind(opts));
      define(opts, '_callbacks', opts._callbacks);
      if (options) {
        opts.merge.apply(opts, arguments);
      }
      return opts;
    });

    // restore original constructor
    this.constructor = ctor;

    // prevent the plugin from
    //  being passed to `run`
    if (opts.run !== false) {
      return fn;
    }
  };
};
