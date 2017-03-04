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
let tap = function (configArg: INpmtsConfig) {
  let done = q.defer()

  /**
   * the TabBuffer for npmts
   */
  let npmtsTapBuffer = new plugins.tapbuffer.TabBuffer()

  /**
   * handle the testable files
   */
  let testableFilesSmartstream = new plugins.smartstream.Smartstream([
    plugins.gulp.src([ plugins.path.join(paths.cwd, './ts/**/*.ts') ]),
    plugins.gulpSourcemaps.init(),
    plugins.gulpTypeScript({
      target: 'ES5',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: [ 'DOM', 'ES5', 'ES2015.Promise', 'ES2015.Generator', 'ES2015.Iterable' ]
    }),
    plugins.gulpSourcemaps.write(),
    plugins.gulpFunction.forEach(async file => {
      file.path = file.path.replace(paths.tsDir, paths.distDir)
    }),
    npmtsTapBuffer.pipeTestableFiles(),
    plugins.through2.obj(
      (file, enc, cb) => {
        cb()
      },
      (cb) => {
        cb()
      }
    )
  ])

  /**
   * handle the test files
   */
  let testFilesSmartstream = new plugins.smartstream.Smartstream([
    plugins.gulp.src([ plugins.path.join(paths.cwd, 'test/test.ts') ]),
    plugins.gulpTypeScript({
      target: 'ES5',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: [ 'DOM', 'ES5', 'ES2015.Promise', 'ES2015.Generator', 'ES2015.Iterable' ]
    }),
    npmtsTapBuffer.pipeTestFiles()
  ])

  // lets run the smartstream
  Promise.all([
    testableFilesSmartstream.run(),
    testFilesSmartstream.run()
  ]).then(
    async () => {
      await npmtsTapBuffer.runTests()
      done.resolve(configArg)
    }, (err) => {
      plugins.beautylog.error('Tests failed!')
      console.log(err)
      if (configArg.watch) {
        done.resolve(configArg)
      } else {
        process.exit(1)
      }
    })

  return done.promise
}

let handleCoverageData = function (configArg: INpmtsConfig) {
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
    plugins.beautylog.ora.end()
    plugins.beautylog.log(
      '------------------------------------------------------\n' +
      '*************************** TESTS: ***************************\n' +
      '--------------------------------------------------------------'
    )

    tap(config)
      .then(handleCoverageData)
      .then(() => {
        done.resolve(config)
      }).catch(err => { console.log(err) })
  } else {
    plugins.beautylog.ora.end()
    done.resolve(config)
  }
  return done.promise
}
