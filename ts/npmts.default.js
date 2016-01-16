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
//# sourceMappingURL=npmts.default.js.map