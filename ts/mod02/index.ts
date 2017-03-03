/* ------------------------------------------
 * This module tests the compiled TypeScript files
 * -------------------------------------------- */
import plugins = require('./mod02.plugins')
import paths = require('../npmts.paths')

import * as q from 'smartq'

import { INpmtsConfig } from '../npmts.config'

/**
 * runs mocha
 * @returns INpmtsConfig
 */
let ava = function (configArg: INpmtsConfig) {
  plugins.beautylog.ora.text('Instrumentalizing and testing transpiled JS')
  plugins.beautylog.ora.end() // end plugins.beautylog.ora for tests.
  let done = q.defer()

  let coverageSmartstream = new plugins.smartstream.Smartstream([
    plugins.gulp.src([plugins.path.join(paths.cwd, './ts/**/*.ts')]),
    plugins.gulpSourcemaps.init(),
    plugins.gulpTypeScript({
      target: 'ES5',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: ['DOM', 'ES5', 'ES2015.Promise', 'ES2015.Generator', 'ES2015.Iterable']
    }),
    plugins.gulpIstanbul({
    }),
    plugins.gulpSourcemaps.write(),
    plugins.gulpFunction.forEach(async file => {
      file.path = file.path.replace(paths.tsDir, paths.distDir)
    }),
    plugins.smartava.pipeTestableFiles(),
    plugins.through2.obj(
      (file, enc, cb) => {
        cb()
      },
      (cb) => {
        cb()
      }
    )
  ])

  let localSmartstream = new plugins.smartstream.Smartstream([
    plugins.gulp.src([plugins.path.join(paths.cwd, 'test/test.ts')]),
    plugins.gulpTypeScript({
      target: 'ES5',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: ['DOM', 'ES5', 'ES2015.Promise', 'ES2015.Generator', 'ES2015.Iterable']
    }),
    plugins.smartava.pipeTestFiles(),
    plugins.gulpMocha(),
    plugins.gulpIstanbul.writeReports({
      dir: plugins.path.join(paths.cwd, './coverage'),
      reporters: ['lcovonly', 'json', 'text', 'text-summary']
    })
  ])
  coverageSmartstream.run()
    .then(
    () => {
      plugins.beautylog.info('code is now transpiled to ES5, instrumented with istanbul, and injected for mocha!')
      return localSmartstream.run()
        .then(() => { done.resolve(configArg) }, (err) => {
          plugins.beautylog.error('Tests failed!')
          console.log(err)
          if (configArg.watch) {
            done.resolve(configArg)
          } else {
            process.exit(1)
          }
        })
    },
    (err) => {
      console.log(err)
    })
  return done.promise
}

let coverage = function (configArg: INpmtsConfig) {
  let done = q.defer()
  plugins.smartcov.get.percentage(plugins.path.join(paths.coverageDir, 'lcov.info'), 2)
    .then(function (percentageArg) {
      if (percentageArg >= configArg.coverageTreshold) {
        plugins.beautylog.ok(
          `${percentageArg.toString()}% `
          + `coverage exceeds your treshold of `
          + `${configArg.coverageTreshold.toString()}%`
        )
      } else {
        plugins.beautylog.warn(
          `${percentageArg.toString()}% `
          + `coverage fails your treshold of `
          + `${configArg.coverageTreshold.toString()}%`
        )
        plugins.beautylog.error('exiting due to coverage failure')
        if (!configArg.watch) { process.exit(1) }
      }
      done.resolve(configArg)
    })
  return done.promise
}

export let run = function (configArg: INpmtsConfig) {
  let done = q.defer<INpmtsConfig>()
  let config = configArg
  if (config.test === true) {
    plugins.beautylog.ora.text('now starting tests')
    plugins.beautylog.log(
      '------------------------------------------------------\n' +
      '*************************** TESTS: ***************************\n' +
      '--------------------------------------------------------------'
    )

    ava(config)
      .then(coverage)
      .then(() => {
        done.resolve(config)
      }).catch(err => { console.log(err) })
  } else {
    plugins.beautylog.ora.end()
    done.resolve(config)
  }
  return done.promise
}
