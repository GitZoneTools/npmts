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
//# sourceMappingURL=index.js.map