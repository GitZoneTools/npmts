/* ------------------------------------------
 * This module tests the compiled TypeScript files
 * -------------------------------------------- */
import plugins = require('./mod.plugins');
import paths = require('../npmts.paths');

import * as q from 'smartq';

// interfaces
import { INpmtsConfig } from '../npmts.config';
import { Smartfile } from 'smartfile';

let testTypeScriptConfig = {
  target: 'ES5',
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  lib: ['DOM', 'ESNext']
};

/**
 * runs mocha
 * @returns INpmtsConfig
 */
let tap = function(configArg: INpmtsConfig) {
  let done = q.defer();

  /**
   * the TabBuffer for npmts
   */
  let npmtsTapBuffer = new plugins.tapbuffer.TabBuffer();

  npmtsTapBuffer.setConfig(configArg.testConfig);

  /**
   * handle the testable files
   */
  let testableFilesSmartstream = new plugins.smartstream.Smartstream([
    plugins.smartgulp.src([plugins.path.join(paths.cwd, './ts/**/*.ts')]),
    plugins.gulpSourcemaps.init(),
    plugins.gulpTypeScript(testTypeScriptConfig),
    plugins.gulpSourcemaps.write(),
    npmtsTapBuffer.pipeTestableFiles(),
    plugins.smartstream.cleanPipe()
  ]);

  /**
   * handle the test files
   */
  let testFilesSmartstream = new plugins.smartstream.Smartstream([
    plugins.smartgulp.src([plugins.path.join(paths.cwd, 'test/*.ts')]),
    plugins.gulpSourcemaps.init(),
    plugins.gulpTypeScript(testTypeScriptConfig),
    plugins.gulpSourcemaps.write(),
    npmtsTapBuffer.pipeTestFiles(),
    plugins.smartstream.cleanPipe()
  ]);

  // lets run the smartstream
  Promise.all([testableFilesSmartstream.run(), testFilesSmartstream.run()]).then(
    async () => {
      configArg.runData.coverageLcovInfo = await npmtsTapBuffer.runTests();
      done.resolve(configArg);
    },
    err => {
      plugins.beautylog.error('Tests failed!');
      console.log(err);
      if (configArg.watch) {
        done.resolve(configArg);
      } else {
        process.exit(1);
      }
    }
  );

  return done.promise;
};

let handleCoverageData = async (configArg: INpmtsConfig) => {
  let coverageResult: number = 0; // the coverage in percent
  if (configArg.runData.coverageLcovInfo) {
    coverageResult = await plugins.smartcov.get.percentageFromLcovString(
      configArg.runData.coverageLcovInfo,
      2
    );
  } else {
    plugins.beautylog.warn(
      'Hey... Did your tests import and use your module that you are trying to test?'
    );
  }

  if (coverageResult >= configArg.coverageTreshold) {
    plugins.beautylog.ok(
      `${coverageResult.toString()}% ` +
        `coverage exceeds your treshold of ` +
        `${configArg.coverageTreshold.toString()}%`
    );
  } else {
    plugins.beautylog.warn(
      `${coverageResult.toString()}% ` +
        `coverage fails your treshold of ` +
        `${configArg.coverageTreshold.toString()}%`
    );
    plugins.beautylog.error('exiting due to coverage failure');
    if (!configArg.watch) {
      process.exit(1);
    }
  }
  return configArg;
};

export let run = function(configArg: INpmtsConfig) {
  let done = q.defer<INpmtsConfig>();
  let config = configArg;
  if (config.test === true) {
    plugins.beautylog.ora.text('now starting tests');
    plugins.beautylog.ora.end();
    plugins.beautylog.log('ready for tapbuffer:');
    if (configArg.testConfig.coverage) {
      tap(config)
        .then(handleCoverageData)
        .then(() => {
          done.resolve(config);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      tap(config)
        .then(() => {
          done.resolve(config);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    plugins.beautylog.ora.end();
    done.resolve(config);
  }
  return done.promise;
};
