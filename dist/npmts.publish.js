"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var NpmtsJsdoc = require("./npmts.jsdoc");
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
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    var promiseArray = [];
    config.codecov.publish ? promiseArray.push(exports.publishCoverage(configArg)) : void (0);
    config.docs.publish ? promiseArray.push(NpmtsJsdoc.publishDocs(configArg)) : void (0);
    promiseArray.length === 0 ? plugins.beautylog.info("Did not publish anything!") : void (0);
    plugins.Q.all(promiseArray).then(done.resolve);
    return done.promise;
};
