/// <reference path="./index.ts" />

module NpmtsDefault {
    export var init = function() {
        plugins.gulp.task("indexTS", function(){
            var tsResult = plugins.gulp.src(paths.indexTS)
                .pipe(plugins.g.typescript({
                    out:"index.js",
                    declaration:true
                }));

            return plugins.mergeStream([
                tsResult.dts.pipe(plugins.gulp.dest(paths.cwd)),
                tsResult.js
                    .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                    .pipe(plugins.gulp.dest(paths.cwd))
            ]);
        });

        plugins.gulp.task("testTS", function(){
            plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                    out: "test.js"
                }))
                .pipe(plugins.gulp.dest(paths.cwd))
        });

        plugins.gulp.task("default",["indexTS","testTS"],function(){
            plugins.beautylog.success("TypeScript for this module was compiled successfully.");
        });

        plugins.gulp.start.apply(plugins.gulp, ['default']);
    }
}
