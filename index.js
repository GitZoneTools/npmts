#!/usr/bin/env node

/// <reference path="./index.ts" />
var NpmtsPlugins;
(function (NpmtsPlugins) {
    NpmtsPlugins.init = function () {
        var plugins = {
            beautylog: require("beautylog"),
            gulp: require("gulp"),
            gulpTypeScript: require("gulp-typescript"),
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
        plugins.gulp.task("indexTS", function () {
            plugins.gulp.src(paths.indexTS)
                .pipe(plugins.gulpTypeScript({
                out: "index.js"
            }))
                .pipe(plugins.gulp.dest(paths.cwd));
        });
        plugins.gulp.task("testTS", function () {
            plugins.gulp.src(paths.testTS)
                .pipe(plugins.gulpTypeScript({
                out: "test.js"
            }))
                .pipe(plugins.gulp.dest(paths.cwd));
        });
        plugins.gulp.task("default", ["indexTS", "testTS"], function () {
            plugins.beautylog.success("TypeScript for this module was compiled successfully.");
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
