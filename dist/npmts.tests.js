"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
/**
 *
 * @returns {*}
 */
let mocha = function (configArg) {
    npmts_promisechain_1.npmtsOra.text('Instrumentalizing and testing transpiled JS');
    npmts_promisechain_1.npmtsOra.end(); // end npmtsOra for tests.
    let done = plugins.q.defer();
    plugins.gulp.src([plugins.path.join(paths.cwd, 'dist/*.js')])
        .pipe(plugins.g.sourcemaps.init())
        .pipe(plugins.g.babel({
        presets: [
            require.resolve('babel-preset-es2015')
        ]
    }))
        .pipe(plugins.g.istanbul({}))
        .pipe(plugins.g.sourcemaps.write())
        .pipe(plugins.g.injectModules())
        .on('finish', function () {
        plugins.gulp.src([plugins.path.join(paths.cwd, 'test/test.js')])
            .pipe(plugins.g.babel({
            presets: [
                require.resolve('babel-preset-es2015')
            ]
        }))
            .pipe(plugins.g.injectModules())
            .pipe(plugins.g.mocha())
            .pipe(plugins.g.istanbul.writeReports({
            dir: plugins.path.join(paths.cwd, './coverage'),
            reporters: ['lcovonly', 'json', 'text', 'text-summary']
        }))
            .pipe(plugins.g.gFunction(function () {
            plugins.beautylog.ok('Tested!');
            done.resolve(configArg);
        }, 'atEnd'));
    });
    return done.promise;
};
let coverage = function (configArg) {
    let done = plugins.q.defer();
    plugins.smartcov.get.percentage(plugins.path.join(paths.coverageDir, 'lcov.info'), 2)
        .then(function (percentageArg) {
        if (percentageArg >= configArg.coverageTreshold) {
            plugins.beautylog.ok(`${percentageArg.toString()}% `
                + `coverage exceeds your treshold of `
                + `${configArg.coverageTreshold.toString()}%`);
        }
        else {
            plugins.beautylog.warn(`${percentageArg.toString()}% `
                + `coverage fails your treshold of `
                + `${configArg.coverageTreshold.toString()}%`);
            plugins.beautylog.error('exiting due to coverage failure');
            process.exit(1);
        }
        done.resolve(configArg);
    });
    return done.promise;
};
exports.run = function (configArg) {
    let done = plugins.q.defer();
    let config = configArg;
    if (config.test === true) {
        npmts_promisechain_1.npmtsOra.text('now starting tests');
        plugins.beautylog.log('-------------------------------------------------------\n' +
            '*************************** TESTS: ***************************\n' +
            '--------------------------------------------------------------');
        mocha(config)
            .then(coverage)
            .then(() => {
            done.resolve(config);
        });
    }
    else {
        npmts_promisechain_1.npmtsOra.end();
        done.resolve(config);
    }
    return done.promise;
};
