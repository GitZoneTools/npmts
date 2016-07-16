"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
/**
 *
 * @returns {*}
 */
var mocha = function (configArg) {
    npmts_promisechain_1.npmtsOra.text("Instrumentalizing and testing transpiled JS");
    npmts_promisechain_1.npmtsOra.end(); // end npmtsOra for tests.
    var done = plugins.Q.defer();
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd, "dist/*.js")])
        .pipe(plugins.g.sourcemaps.init())
        .pipe(plugins.g.babel({
        presets: [
            plugins.path.join(paths.npmtsPackageRoot, "node_modules/babel-preset-es2015/index.js")
        ]
    }))
        .pipe(plugins.g.istanbul())
        .pipe(plugins.g.sourcemaps.write())
        .pipe(plugins.g.injectModules())
        .on("finish", function () {
        plugins.gulp.src([plugins.path.join(paths.cwd, "test/test.js")])
            .pipe(plugins.g.babel({
            presets: [
                plugins.path.join(paths.npmtsPackageRoot, "node_modules/babel-preset-es2015/index.js")
            ]
        }))
            .pipe(plugins.g.injectModules())
            .pipe(plugins.g.mocha())
            .pipe(plugins.g.istanbul.writeReports())
            .pipe(plugins.g.gFunction(function () {
            plugins.beautylog.ok("Tested!");
            done.resolve(configArg);
        }, "atEnd"));
    });
    return done.promise;
};
var coverage = function (configArg) {
    var done = plugins.Q.defer();
    plugins.smartcov.get.percentage(plugins.path.join(paths.coverageDir, "lcov.info"))
        .then(function (percentageArg) {
        if (percentageArg >= configArg.coverageTreshold) {
            plugins.beautylog.ok("your coverage of " + percentageArg.toString().blue + "% ".blue + "exceeds your treshold of " +
                configArg.coverageTreshold.toString().blue + "%".blue);
        }
        else {
            plugins.beautylog.warn("your coverage of " + percentageArg + "% " + "fails your treshold of " +
                configArg.coverageTreshold + "%");
            plugins.beautylog.error("exiting due to coverage failure");
            process.exit(1);
        }
        done.resolve(configArg);
    });
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    if (config.notest != true) {
        npmts_promisechain_1.npmtsOra.text("now starting tests");
        plugins.beautylog.log("-------------------------------------------------------\n" +
            "*************************** TESTS: ***************************\n" +
            "--------------------------------------------------------------");
        mocha(config)
            .then(coverage)
            .then(function () {
            done.resolve(config);
        });
    }
    else {
        npmts_promisechain_1.npmtsOra.end();
        done.resolve(config);
    }
    return done.promise;
};
