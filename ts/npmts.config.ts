import plugins = require('./npmts.plugins')
import paths = require('./npmts.paths')

import * as q from 'smartq'

export type npmtsMode = 'default' | 'custom'

export interface INpmtsConfig {
    argv: any,
    coverageTreshold: number,
    mode: npmtsMode,
    test: boolean,
    testTs: any,
    ts: any,
    tsOptions: any,
    watch: boolean

};

export let run = function (argvArg) {
    let done = q.defer()
    let defaultConfig: INpmtsConfig = {
        argv: undefined,
        coverageTreshold: 70,
        mode: 'default',
        test: true,
        testTs: {},
        ts: {},
        tsOptions: {},
        watch: false
    }

    // mix with configfile
    plugins.beautylog.ora.text('running npmextra')

    let localNpmextra = new plugins.npmextra.Npmextra(paths.cwd)
    let config: INpmtsConfig = localNpmextra.dataFor<INpmtsConfig>(
        'npmts',
        defaultConfig
    )

    // add argv
    config.argv = argvArg

    // check mode
    switch (config.mode) {
        case 'default':
        case 'custom':
            plugins.beautylog.ok('mode is ' + config.mode)
            done.resolve(config)
            break
        default:
            plugins.beautylog.error(`mode not recognised!`)
            process.exit(1)
    };

    // handle default mode
    if (config.mode === 'default') {
        config.ts = {
            './ts/**/*.ts': './dist/'
        }
        config.testTs = {
            './test/**/*.ts': './test/'
        }
    };

    // mix with commandline
    if (config.argv.notest) {
        config.test = false
    };
    if (config.argv.watch) {
        config.watch = true
    };

    plugins.beautylog.ok('build options are ready!')
    done.resolve(config)
    return done.promise
}
