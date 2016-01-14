#!/usr/bin/env node

/// <reference path="./typings/tsd.d.ts" />
var plugins = {
    beautylog: require("beautylog"),
    gulp: require("gulp"),
    gulpTypeScript: require("gulp-typescript"),
    path: require("path"),
    smartcli: require("smartcli")
};
var paths = {};
paths.cwd = plugins.smartcli.get.cwd().path;
console.log(paths.cwd);
paths.indexTS = plugins.path.join(paths.cwd, "ts/index.ts");
paths.testTS = plugins.path.join(paths.cwd, "ts/test.ts");
plugins.gulp.task("indexTS", function () {
    plugins.gulp.src(paths.indexTS)
        .pipe(plugins.gulpTypeScript({
        out: "index.js"
    }))
        .pipe(plugins.gulp.dest(paths.cwd));
});
plugins.gulp.task("indexTS", function () {
    plugins.gulp.src(paths.indexTS)
        .pipe(plugins.gulpTypeScript({
        out: "test.js"
    }))
        .pipe(plugins.gulp.dest(paths.cwd));
});
