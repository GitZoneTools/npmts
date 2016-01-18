#!/usr/bin/env node

/// <reference path="./index.ts" />
var NpmtsPlugins;
(function (NpmtsPlugins) {
    NpmtsPlugins.init = function () {
        var plugins = {
            beautylog: require("beautylog"),
            gulp: require("gulp"),
            g: {
                insert: require("gulp-insert"),
                sequence: require("gulp-sequence"),
                tsd: require("gulp-tsd"),
                typescript: require("gulp-typescript")
            },
            mergeStream: require("merge2"),
            path: require("path"),
            smartcli: require("smartcli")
        };
        return plugins;
    };
})(NpmtsPlugins || (NpmtsPlugins = {}));
/// <reference path="./index.ts" /> 
/// <reference path="./index.ts" />
var NpmtsPaths;
(function (NpmtsPaths) {
    NpmtsPaths.init = function () {
        var paths = {};
        paths.cwd = plugins.smartcli.get.cwd().path;
        paths.tsd = plugins.path.join(paths.cwd, "ts/tsd.json");
        paths.indexTS = plugins.path.join(paths.cwd, "ts/index.ts");
        paths.testTS = plugins.path.join(paths.cwd, "ts/test.ts");
        return paths;
    };
})(NpmtsPaths || (NpmtsPaths = {}));
/// <reference path="./index.ts" /> 
/// <reference path="./index.ts" />
var NpmtsDefault;
(function (NpmtsDefault) {
    NpmtsDefault.init = function () {
        plugins.gulp.task("defaultTsd", function (cb) {
            plugins.beautylog.log("now installing typings from" + " ts/tsd.json".blue);
            plugins.g.tsd({
                command: 'reinstall',
                config: paths.tsd
            }, cb);
        });
        plugins.gulp.task("defaultIndexTS", function () {
            plugins.beautylog.log("now compiling" + " ts/index.ts".blue);
            var tsResult = plugins.gulp.src(paths.indexTS)
                .pipe(plugins.g.typescript({
                out: "index.js",
                declaration: true
            }));
            return plugins.mergeStream([
                tsResult.dts.pipe(plugins.gulp.dest(paths.cwd)),
                tsResult.js
                    .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                    .pipe(plugins.gulp.dest(paths.cwd))
            ]);
        });
        plugins.gulp.task("defaultTestTS", function () {
            plugins.beautylog.log("now compiling" + " ts/test.ts".blue);
            plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                out: "test.js"
            }))
                .pipe(plugins.gulp.dest(paths.cwd));
        });
        plugins.gulp.task("defaultCleanup", function (cb) {
            plugins.beautylog.success("TypeScript for this module compiled successfully.");
            cb();
        });
        plugins.gulp.task("default", function (cb) {
            plugins.g.sequence("defaultTsd", "defaultIndexTS", "defaultTestTS", "defaultCleanup", cb);
        });
        plugins.gulp.start.apply(plugins.gulp, ['default']);
    };
})(NpmtsDefault || (NpmtsDefault = {}));
/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./npmts.plugins.ts" />
/// <reference path="./npmts.cli.ts" />
/// <reference path="./npmts.paths.ts" />
/// <reference path="./npmts.custom.ts" />
/// <reference path="./npmts.default.ts" />
var plugins = NpmtsPlugins.init();
var paths = NpmtsPaths.init();
NpmtsDefault.init();
