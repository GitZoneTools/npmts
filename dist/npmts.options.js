"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
;
exports.run = function (argvArg) {
    let done = plugins.q.defer();
    let defaultConfig = {
        argv: undefined,
        coverageTreshold: 70,
        docs: true,
        mode: 'default',
        test: true,
        testTs: {},
        ts: {},
        tsOptions: {},
        watch: false
    };
    // mix with configfile
    npmts_promisechain_1.npmtsOra.text('looking for npmextra.json');
    let config = plugins.npmextra.dataFor({
        toolName: 'npmts',
        defaultSettings: defaultConfig,
        cwd: paths.cwd
    });
    // add argv
    config.argv = argvArg;
    // check mode
    switch (config.mode) {
        case 'default':
        case 'custom':
            plugins.beautylog.ok('mode is ' + config.mode);
            done.resolve(config);
            break;
        default:
            plugins.beautylog.error(`mode not recognised!`);
            process.exit(1);
    }
    ;
    // handle default mode
    if (config.mode === 'default') {
        config.ts = {
            ['./ts/**/*.ts']: './dist/'
        };
        config.testTs = {
            ['./test/test.ts']: './test/'
        };
    }
    ;
    // mix with commandline
    if (config.argv.notest) {
        config.test = false;
    }
    ;
    if (config.argv.nodocs) {
        config.docs = false;
    }
    ;
    if (config.argv.watch) {
        config.watch = true;
    }
    ;
    plugins.beautylog.ok('build options are ready!');
    done.resolve(config);
    return done.promise;
};
