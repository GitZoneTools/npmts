"use strict";
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const q = require("q");
const npmts_promisechain_1 = require("./npmts.promisechain");
/**
 * runs mocha
 * @returns INpmtsConfig
 */
let mocha = function (configArg) {
    npmts_promisechain_1.npmtsOra.text('Instrumentalizing and testing transpiled JS');
    npmts_promisechain_1.npmtsOra.end(); // end npmtsOra for tests.
    let done = q.defer();
    plugins.gulp.src([plugins.path.join(paths.cwd, 'dist/*.js')])
        .pipe(plugins.gulpSourcemaps.init())
        .pipe(plugins.gulpBabel({
        presets: [
            require.resolve('babel-preset-es2015')
        ]
    }))
        .pipe(plugins.gulpIstanbul({}))
        .pipe(plugins.gulpSourcemaps.write())
        .pipe(plugins.gulpInjectModules())
        .on('finish', function () {
        let localSmartstream = new plugins.smartstream.Smartstream([
            plugins.gulp.src([plugins.path.join(paths.cwd, 'test/test.js')]),
            plugins.gulpBabel({
                presets: [
                    require.resolve('babel-preset-es2015')
                ]
            }),
            plugins.gulpInjectModules(),
            plugins.gulpMocha(),
            plugins.gulpIstanbul.writeReports({
                dir: plugins.path.join(paths.cwd, './coverage'),
                reporters: ['lcovonly', 'json', 'text', 'text-summary']
            })
        ]);
        localSmartstream.run()
            .then(() => { done.resolve(configArg); }, (err) => {
            plugins.beautylog.error('Tests failed!');
            if (configArg.watch) {
                done.resolve(configArg);
            }
            else {
                process.exit(1);
            }
        });
    });
    return done.promise;
};
let coverage = function (configArg) {
    let done = q.defer();
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
            if (!configArg.watch) {
                process.exit(1);
            }
        }
        done.resolve(configArg);
    });
    return done.promise;
};
exports.run = function (configArg) {
    let done = q.defer();
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
