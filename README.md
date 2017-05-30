# base-option [![NPM version](https://img.shields.io/npm/v/base-option.svg?style=flat)](https://www.npmjs.com/package/base-option) [![NPM monthly downloads](https://img.shields.io/npm/dm/base-option.svg?style=flat)](https://npmjs.org/package/base-option) [![NPM total downloads](https://img.shields.io/npm/dt/base-option.svg?style=flat)](https://npmjs.org/package/base-option) [![Linux Build Status](https://img.shields.io/travis/node-base/base-option.svg?style=flat&label=Travis)](https://travis-ci.org/node-base/base-option)

> Adds a few options methods to base, like `option`, `enable` and `disable`. See the readme for the full API.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-option
```

## Usage

Use as a plugin with with your `base` application:

```js
var Base = require('base');
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

## About

### Related projects

* [base-data](https://www.npmjs.com/package/base-data): adds a `data` method to base-methods. | [homepage](https://github.com/node-base/base-data "adds a `data` method to base-methods.")
* [base-task](https://www.npmjs.com/package/base-task): base plugin that provides a very thin wrapper around [https://github.com/doowb/composer](https://github.com/doowb/composer) for adding task methods to… [more](https://github.com/node-base/base-task) | [homepage](https://github.com/node-base/base-task "base plugin that provides a very thin wrapper around <https://github.com/doowb/composer> for adding task methods to your application.")
* [base](https://www.npmjs.com/package/base): Framework for rapidly creating high quality node.js applications, using plugins like building blocks | [homepage](https://github.com/node-base/base "Framework for rapidly creating high quality node.js applications, using plugins like building blocks")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 64 | [jonschlinkert](https://github.com/jonschlinkert) |
| 4 | [doowb](https://github.com/doowb) |

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on May 30, 2017._