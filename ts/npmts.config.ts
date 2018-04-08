import plugins = require('./npmts.plugins');
import paths = require('./npmts.paths');

import * as smartq from 'smartq';

// interfaces
import { ITapbufferConfig } from 'tapbuffer';

/**
 * specifies the different modes available
 * default -> uses default options no matterm what
 * merge -> uses merged default + custom options
 * custom -> only uses specified options
 */
export type npmtsMode = 'default' | 'custom' | 'merge';

export interface INpmtsConfig {
  argv: any;
  coverageTreshold: number;
  checkDependencies: boolean;
  mode: npmtsMode;
  test: boolean;
  testTs: any;
  testConfig: ITapbufferConfig;
  ts: any;
  tsOptions: any;
  watch: boolean;
  runData: {
    coverageLcovInfo?: string;
    coverageResult?: number;
  };
}

export let run = function(argvArg) {
  let done = smartq.defer();
  let defaultConfig: INpmtsConfig = {
    argv: undefined,
    coverageTreshold: 70,
    checkDependencies: true,
    mode: 'default',
    test: true,
    testTs: {},
    testConfig: {
      parallel: true,
      coverage: true
    },
    ts: {},
    tsOptions: {},
    watch: false,
    runData: {}
  };

  // mix with configfile
  plugins.beautylog.ora.text('running npmextra');

  let localNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
  let config: INpmtsConfig = localNpmextra.dataFor<INpmtsConfig>('npmts', defaultConfig);

  // add argv
  config.argv = argvArg;

  // check mode
  switch (config.mode) {
    case 'default':
    case 'custom':
    case 'merge':
      plugins.beautylog.ok('mode is ' + config.mode);
      done.resolve(config);
      break;
    default:
      plugins.beautylog.error(`mode not recognised! Can be default or custom`);
      process.exit(1);
  }

  // handle default mode
  if (config.mode === 'default' || config.mode === 'merge') {
    config.ts = {
      './ts/**/*.ts': './dist/'
    };
    config.testTs = {
      './test/**/*.ts': './test/'
    };
  }

  // mix with commandline
  if (config.argv.notest) {
    config.test = false;
  }

  if (config.argv.nocoverage) {
    config.testConfig.coverage = false;
  }

  if (config.argv.nochecks) {
    config.checkDependencies = false;
  }

  if (config.argv.watch) {
    config.watch = true;
  }

  plugins.beautylog.ok('build options are ready!');
  done.resolve(config);
  configDeferred.resolve(config);
  return done.promise;
};

// config deferred usage
let configDeferred = smartq.defer<INpmtsConfig>();
export let configPromise = configDeferred.promise;
