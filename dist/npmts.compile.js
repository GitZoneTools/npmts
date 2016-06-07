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
        plugins.beautylog.warn("No TS file and thus no definitions found!");
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
var compileTs = function (tsFileArrayArg, tsOptionsArg) {
    if (tsOptionsArg === void 0) { tsOptionsArg = {}; }
    var done = plugins.Q.defer();
    var moduleStream = plugins.merge2({ end: false });
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
            var tsStream = plugins.gulp.src([plugins.path.join(paths.cwd, keyArg), "!**/typings/**"])
                .pipe(plugins.g.sourcemaps.init()) // This means sourcemaps will be generated
                .pipe(plugins.g.typescript(tsOptions(keyArg)));
            var jsStream = tsStream.js
                .pipe(plugins.g.sourcemaps.write()) // Now the sourcemaps are added to the .js file
                .pipe(plugins.gulp.dest(tsFileArrayArg[keyArg]));
            var declarationStream = tsStream.dts
                .pipe(plugins.gulp.dest(tsFileArrayArg[keyArg]));
            moduleStream.add(tsStream, jsStream, declarationStream);
        }
    }
    moduleStream.on("queueDrain", function () {
        done.resolve();
    });
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
        definitionHandler(config)
            .then(function () {
            done.resolve(config);
        });
    });
    /*==================== END TS Compilation =====================*/
    return done.promise;
};
