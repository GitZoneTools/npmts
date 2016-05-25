"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var helpers = require("./npmts.compile.helpers");
var npmts_promisechain_1 = require("./npmts.promisechain");
/**
 * handles definition to make them fit for modular use
 */
var definitionHandler = function (configArg) {
    npmts_promisechain_1.npmtsOra.text("now making declaration files ready");
    var done = plugins.Q.defer();
    var configTsLenght = Object.keys(configArg.ts).length;
    if (configTsLenght == 0) {
        plugins.beautylog.warn("No declaration files found... Are you sure you don't want them?");
        done.resolve(configArg); //if there are no definition files, resolve...
    }
    var localCounter = 0;
    for (var key in configArg.ts) {
        var distPath = configArg.ts[key];
        var stream = plugins.gulp.src(plugins.path.join(distPath, "**/*.d.ts"))
            .pipe(plugins.g.replace(plugins.smartstring.typescript.regexReferencePath, ""))
            .pipe(plugins.gulp.dest(distPath))
            .pipe(plugins.g.gFunction(function () {
            localCounter++;
            if (localCounter == configTsLenght) {
                plugins.beautylog.ok("made declaration files ready!");
                done.resolve(configArg);
            }
            ;
        }, "atEnd"));
    }
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    npmts_promisechain_1.npmtsOra.text("now compiling " + "TypeScript".yellow);
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
        moduleStream.on("finish", function () {
            plugins.beautylog.ok("compiled TypeScript!");
            definitionHandler(config)
                .then(function () {
                done.resolve(config);
            });
        });
        moduleStream.end();
    });
    /*==================== END TS Compilation =====================*/
    return done.promise;
};
