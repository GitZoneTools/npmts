"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var helpers = require("./npmts.compile.helpers");
var npmts_promisechain_1 = require("./npmts.promisechain");
var promiseArray = [];
var compileTs = function (tsFileArrayArg, tsOptionsArg) {
    if (tsOptionsArg === void 0) { tsOptionsArg = {}; }
    var done = plugins.Q.defer();
    var compilerOptionsDefault = {
        declaration: true,
        module: "CommonJS",
        target: "ES6"
    };
    /**
     * merges default ts options with those found in npmts.json
     */
    var compilerOptions = function (keyArg) {
        var tsOptionsCombined = plugins.lodashObject.merge(compilerOptionsDefault, tsOptionsArg);
        var compilerOptions = {
            declaration: tsOptionsCombined.declaration,
            module: plugins.tsn.ModuleKind[tsOptionsCombined.module],
            target: plugins.tsn.ScriptTarget[tsOptionsCombined.target],
            exclude: "node_modules/**/*"
        };
        return compilerOptions;
    };
    var _loop_1 = function(keyArg) {
        plugins.beautylog.info("TypeScript assignment: transpile from " + keyArg.blue + " to " + tsFileArrayArg[keyArg].blue);
        if (helpers.checkOutputPath(tsFileArrayArg, keyArg)) {
            var filesReadPromise = plugins.smartfile.fs.listFileTree(process.cwd(), keyArg)
                .then(function (filesToConvertArg) {
                var filesToConvertAbsolute = plugins.smartpath.transform.toAbsolute(filesToConvertArg, process.cwd());
                var destDir = plugins.smartpath.transform.toAbsolute(tsFileArrayArg[keyArg], process.cwd());
                var filesCompiledPromise = plugins.tsn.compile(filesToConvertAbsolute, destDir, compilerOptions(keyArg));
                promiseArray.push(filesCompiledPromise);
            });
            promiseArray.push(filesReadPromise);
        }
    };
    for (var keyArg in tsFileArrayArg) {
        _loop_1(keyArg);
    }
    ;
    plugins.Q.all(promiseArray)
        .then(done.resolve);
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    npmts_promisechain_1.npmtsOra.text("now compiling " + "TypeScript".yellow);
    compileTs(config.ts, config.tsOptions)
        .then(function () {
        plugins.beautylog.ok("compiled main TypeScript!");
        plugins.beautylog.log("now compiling tests!");
        return compileTs(config.testTs);
    })
        .then(function () {
        plugins.beautylog.ok("compiled all TypeScript!");
        done.resolve(config);
    });
    return done.promise;
};
