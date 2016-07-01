"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var helpers = require("./npmts.compile.helpers");
var npmts_promisechain_1 = require("./npmts.promisechain");
var compileTs = function (tsFileArrayArg, tsOptionsArg) {
    if (tsOptionsArg === void 0) { tsOptionsArg = {}; }
    var done = plugins.Q.defer();
    var tsOptionsDefault = {
        declaration: true,
        target: "ES5",
        module: "commonjs"
    };
    /**
     * merges default ts options with those found in npmts.json
     */
    var tsOptions = function (keyArg) {
        return plugins.lodashObject.assign(tsOptionsDefault, tsOptionsArg);
    };
    for (var keyArg in tsFileArrayArg) {
        if (helpers.checkOutputPath(tsFileArrayArg, keyArg)) {
            var tsStream = plugins.gulp.src([plugins.path.join(paths.cwd, keyArg), "!**/typings/**"]);
        }
    }
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    npmts_promisechain_1.npmtsOra.text("now compiling " + "TypeScript".yellow);
    compileTs(config.ts, config.tsOptions)
        .then(function () {
        compileTs(config.testTs);
    })
        .then(function () {
        plugins.beautylog.ok("compiled TypeScript!");
        done.resolve(config);
    });
    return done.promise;
};
