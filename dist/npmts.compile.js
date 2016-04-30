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
    for (var key in config.ts) {
        var stream = plugins.gulp.src([plugins.path.join(paths.cwd, key), "!**/typings/**"])
            .pipe(plugins.g.sourcemaps.init()) // This means sourcemaps will be generated
            .pipe(plugins.g.typescript({
            out: helpers.outputName(config, key),
            target: "ES5",
            module: "commonjs"
        }))
            .pipe(plugins.g.sourcemaps.write()) // Now the sourcemaps are added to the .js file
            .pipe(plugins.gulp.dest(helpers.outputDir(config, key)));
        moduleStream.add(stream);
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
