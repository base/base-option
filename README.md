# base-option [![NPM version](https://img.shields.io/npm/v/base-option.svg)](https://www.npmjs.com/package/base-option) [![Build Status](https://img.shields.io/travis/node-base/base-option.svg)](https://travis-ci.org/node-base/base-option)

> Adds a few options methods to base, like `option`, `enable` and `disable`. See the readme for the full API.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-option --save
```

## Usage

Use as a plugin with with your `base` application:

```js
var Base = require('base-methods');
var options = require('base-option');

var base = new Base();
base.use(options()); // plugin

// set an option
app.option('a', 'b');

// set a nested property
app.option('x.y', 'z');

// get an option
console.log(app.option('x'));
//=> {y: 'z'}
```

## API

### .option

Set or get an option.

**Params**

* `key` **{String}**: The option name.
* `value` **{any}**: The value to set.
* `returns` **{any}**: Returns a `value` when only `key` is defined.

**Example**

```js
app.option('a', true);
app.option('a');
//=> true
```

### .hasOption

Return true if `options.hasOwnProperty(key)`

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: True if `prop` exists.

**Example**

```js
app.hasOption('a');
//=> false
app.option('a', 'b');
app.hasOption('a');
//=> true
```

### .enable

Enable `key`.

**Params**

* `key` **{String}**
* `returns` **{Object}** `Options`: to enable chaining

**Example**

```js
app.enable('a');
```

### .disable

Disable `key`.

**Params**

* `key` **{String}**: The option to disable.
* `returns` **{Object}** `Options`: to enable chaining

**Example**

```js
app.disable('a');
```

### .enabled

Check if `prop` is enabled (truthy).

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**

**Example**

```js
app.enabled('a');
//=> false

app.enable('a');
app.enabled('a');
//=> true
```

### .disabled

Check if `prop` is disabled (falsey).

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: Returns true if `prop` is disabled.

**Example**

```js
app.disabled('a');
//=> true

app.enable('a');
app.disabled('a');
//=> false
```

### .isTrue

Returns true if the value of `prop` is strictly `true`.

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: Uses strict equality for comparison.

**Example**

```js
app.option('a', 'b');
app.isTrue('a');
//=> false

app.option('c', true);
app.isTrue('c');
//=> true

app.option({a: {b: {c: true}}});
app.isTrue('a.b.c');
//=> true
```

### .isFalse

Returns true if the value of `key` is strictly `false`.

**Params**

* `prop` **{String}**
* `returns` **{Boolean}**: Uses strict equality for comparison.

**Example**

```js
app.option('a', null);
app.isFalse('a');
//=> false

app.option('c', false);
app.isFalse('c');
//=> true

app.option({a: {b: {c: false}}});
app.isFalse('a.b.c');
//=> true
```

### .isBoolean

Return true if the value of key is either `true` or `false`.

**Params**

* `key` **{String}**
* `returns` **{Boolean}**: True if `true` or `false`.

**Example**

```js
app.option('a', 'b');
app.isBoolean('a');
//=> false

app.option('c', true);
app.isBoolean('c');
//=> true
```

### [.option.set](index.js#L45)

Set option `key` on `app.options` with the given `value`

**Params**

* `key` **{String}**: Option key, dot-notation may be used.
* `value` **{any}**

**Example**

```js
app.option.set('a', 'b');
console.log(app.option.get('a'));
//=> 'b'
```

### [.option.get](index.js#L64)

Get option `key` from `app.options`

**Params**

* `key` **{String}**: Option key, dot-notation may be used.
* `returns` **{any}**

**Example**

```js
app.option({a: 'b'});
console.log(app.option.get('a'));
//=> 'b'
```

### [.option.create](index.js#L82)

Returns a shallow clone of `app.options` with all of the options methods, as well as a `.merge` method for merging options onto the cloned object.

**Params**

* `options` **{Options}**: Object to merge onto the returned options object.
* `returns` **{Object}**

**Example**

```js
var opts = app.option.create();
opts.merge({foo: 'bar'});
```

## Related projects

* [base-data](https://www.npmjs.com/package/base-data): adds a `data` method to base-methods. | [homepage](https://github.com/jonschlinkert/base-data)
* [base-methods](https://www.npmjs.com/package/base-methods): base-methods is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base-methods) | [homepage](https://github.com/jonschlinkert/base-methods)
* [class-utils](https://www.npmjs.com/package/class-utils): Utils for working with JavaScript classes and prototype methods. | [homepage](https://github.com/jonschlinkert/class-utils)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-option/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/node-base/base-option/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on March 09, 2016._