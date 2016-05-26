const test = require('ava')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const webpack = require('webpack')

const fixturesPath = path.join(__dirname, 'fixtures')

test.cb('compiles a jade template', (t) => {
  const p = path.join(fixturesPath, 'default')
  webpack({
    context: p,
    entry: path.join(p, 'app.js'),
    output: { path: p },
    resolveLoader: { root: path.resolve('..') },
    module: { loaders: [{ test: /\.jade$/, loader: 'lib' }] }
  }, (err, stats) => {
    if (err) { t.end(err) }
    const src = fs.readFileSync(path.join(p, 'bundle.js'), 'utf8')
    t.plan(1)
    var _log = console.log
    console.log = (message) => { t.is(message.trim(), '<p>bar</p>') }
    eval(src) // eslint-disable-line
    console.log = _log
    rimraf(path.join(p, 'bundle.js'), t.end)
  })
})

test.cb('adds jade runtime, tracks dependencies', (t) => {
  const p = path.join(fixturesPath, 'dependencies')
  webpack({
    context: p,
    entry: path.join(p, 'app.js'),
    output: { path: p },
    resolveLoader: { root: path.resolve('..') },
    module: { loaders: [{ test: /\.jade$/, loader: 'lib' }] }
  }, (err, stats) => {
    if (err) { t.end(err) }
    const dep1 = stats.compilation.fileDependencies[0]
    t.regex(dep1, /runtime.js/)
    const dep2 = stats.compilation.fileDependencies[1]
    t.regex(dep2, /_partial.jade/)
    rimraf(path.join(p, 'bundle.js'), t.end)
  })
})

test.cb('throws if options are invalid', (t) => {
  const p = path.join(fixturesPath, 'error')
  webpack({
    context: p,
    entry: path.join(p, 'app.js'),
    output: { path: p },
    resolveLoader: { root: path.resolve('..') },
    module: { loaders: [{ test: /\.jade$/, loader: 'lib' }] },
    jade: { locals: 'wow' }
  }, (_, stats) => {
    if (stats.compilation.errors) {
      const err = stats.compilation.errors[0].toString()
      t.truthy(err.match('"locals" must be an object'))
      t.end()
    } else {
      t.end('no error present with invalid options')
    }
  })
})
