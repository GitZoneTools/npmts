"use strict";
/// <reference path="./typings/index.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.publishCoverage = function (configArg) {
    var done = plugins.Q.defer();
    plugins.beautylog.log("now uploading coverage data to codecov.io");
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd, "./coverage/lcov.info")])
        .pipe(plugins.g.codecov())
        .pipe(plugins.g.gFunction(function () {
        plugins.beautylog.ok("Coverage data has been uploaded to codecov.io!");
        done.resolve(configArg);
    }, "atEnd"));
    return done.promise;
};
/**
 *
 * @returns {*}
 */
var istanbul = function (configArg) {
    var done = plugins.Q.defer();
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd, "dist/*.js")])
        .pipe(plugins.g.istanbul()) // Covering files
        .pipe(plugins.g.istanbul.hookRequire()) // Force `require` to return covered files
        .pipe(plugins.g.gFunction(function () {
        done.resolve(configArg);
    }, "atEnd"));
    return done.promise;
};
/**
 *
 * @returns {*}
 */
var mocha = function (configArg) {
    var done = plugins.Q.defer();
    var stream = plugins.gulp.src(["./test/test.js"])
        .pipe(plugins.g.mocha())
        .pipe(plugins.g.istanbul.writeReports()) // Creating the reports after tests ran
        .pipe(plugins.g.gFunction(function () {
        plugins.beautylog.ok("Tests have passed!");
        done.resolve(configArg);
    }, "atEnd"));
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
    npmts_promisechain_1.npmtsOra.text("now starting tests");
    plugins.beautylog.log("-------------------------------------------------------\n" +
        "*************************** TESTS: ***************************\n" +
        "--------------------------------------------------------------");
    istanbul(config)
        .then(mocha)
        .then(coverage)
        .then(done.resolve);
    return done.promise;
};
