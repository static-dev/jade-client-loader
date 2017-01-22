# Jade Client Loader

[![Greenkeeper badge](https://badges.greenkeeper.io/static-dev/jade-client-loader.svg)](https://greenkeeper.io/)

[![npm](http://img.shields.io/npm/v/jade-client-loader.svg?style=flat)](https://badge.fury.io/js/jade-client-loader) [![tests](http://img.shields.io/travis/static-dev/jade-client-loader/master.svg?style=flat)](https://travis-ci.org/static-dev/jade-client-loader) [![dependencies](http://img.shields.io/david/static-dev/jade-client-loader.svg?style=flat)](https://david-dm.org/static-dev/jade-client-loader)
[![coverage](http://img.shields.io/coveralls/static-dev/jade-client-loader.svg?style=flat)](https://coveralls.io/github/static-dev/jade-client-loader)

Webpack loader that compiles jade to a javascript template

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Why should you care?

This loader is a very simple version of the standard webpack jade loader. It does not hack apart the compiler in order to add the ability to use webpack's `require` internally.

At the moment, it loads up a file according to the test, compiles it as a client template, tracks jade dependencies, and exposes it as an export.

### Installation

`npm i jade-client-loader -S`

### Usage

This loader does not accept any options via `query`, because all `query` options are stringified, which means that functions cannot be passed. However, it's quite a common use-case to pass a function to jade as a local, and unfortunately functions cannot be stringified. Also querystrings are ugly.

So instead, this loader pulls settings directly from the webpack options, from the `jade` key. If you were to set up a simple webpack project using this loader, it would look something like this:

```js
// webpack.config.js
module.exports = {
  module: {
    loaders: [
      { test: /\.jade$/, loader: 'jade-client' }
    ]
  },
  jade: { pretty: false }
}
```

To use a template, you can require it in your primary js file from webpack, like this:

```js
var tpl = require('./test_template.jade')

console.log(tpl({ foo: 'bar' }))
```

Once you execute the required function, it will return your html, and you can use this as you wish!

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
