"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var helpers = require("./npmts.compile.helpers");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    plugins.beautylog.log("now compiling " + "TypeScript".yellow);
    var moduleStream = plugins.merge2({ end: false });
    /* -------------------------------------------------
     * ----------- compile TypeScript --------------------------
     * ----------------------------------------------- */
    var tsOptionsDefault = {
        declaration: true,
        target: "ES5",
        module: "commonjs"
    };
    /**
     * merges default ts options with those found in npmts.json
     */
    var tsOptions = function (keyArg) {
        return plugins.lodashObject.assign(tsOptionsDefault, config.tsOptions);
    };
    for (var keyArg in config.ts) {
        if (helpers.checkOutputPath(config, keyArg)) {
            var tsStream = plugins.gulp.src([plugins.path.join(paths.cwd, keyArg), "!**/typings/**"])
                .pipe(plugins.g.sourcemaps.init()) // This means sourcemaps will be generated
                .pipe(plugins.g.typescript(tsOptions(keyArg)));
            var jsStream = tsStream.js
                .pipe(plugins.g.sourcemaps.write()) // Now the sourcemaps are added to the .js file
                .pipe(plugins.gulp.dest(config.ts[keyArg]));
            var declarationStream = tsStream.dts
                .pipe(plugins.gulp.dest(config.ts[keyArg]));
            moduleStream.add(tsStream, jsStream, declarationStream);
        }
    }
    moduleStream.on("queueDrain", function () {
        plugins.beautylog.ok("TypeScript has been compiled!");
        moduleStream.on("finish", function () {
            done.resolve(config);
        });
        moduleStream.end();
    });
    /*==================== END TS Compilation =====================*/
    return done.promise;
};
