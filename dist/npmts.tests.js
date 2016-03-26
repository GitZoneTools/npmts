"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
exports.publishCoverage = function (configArg) {
    var done = plugins.Q.defer();
    plugins.beautylog.log("now uploading coverage data to coveralls");
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd, "./coverage/lcov.info")])
        .pipe(plugins.g.coveralls())
        .pipe(plugins.g.gFunction(function () {
        plugins.beautylog.ok("Coverage data has been uploaded to Coveralls!");
        done.resolve(configArg);
    }, "atEnd"));
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    var istanbul = function () {
        var stream = plugins.gulp.src([plugins.path.join(paths.cwd, "dist/*.js")])
            .pipe(plugins.g.istanbul())
            .pipe(plugins.g.istanbul.hookRequire());
        return stream;
    };
    var mocha = function () {
        var stream = plugins.gulp.src(["./test/test.js"])
            .pipe(plugins.g.mocha())
            .pipe(plugins.g.istanbul.writeReports())
            .pipe(plugins.g.istanbul.enforceThresholds({ thresholds: { global: 30 } }));
        return stream;
    };
    plugins.beautylog.log("now starting tests");
    console.log("--------------------------------------------------\n" +
        "*******************  TESTS: **********************\n" +
        "--------------------------------------------------");
    istanbul().on("finish", function () {
        mocha().on("finish", function () {
            plugins.beautylog.ok("Tests have passed!");
            done.resolve(config);
        });
    });
    return done.promise;
};
