"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const smartq = require("smartq");
exports.run = function (argvArg) {
    let done = smartq.defer();
    let defaultConfig = {
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
    let config = localNpmextra.dataFor('npmts', defaultConfig);
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
let configDeferred = smartq.defer();
exports.configPromise = configDeferred.promise;
