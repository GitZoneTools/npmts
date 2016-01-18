/// <reference path="./index.ts" />

module NpmtsDefault {
    export var init = function() {
        plugins.gulp.task("defaultTsd",function(cb){
            plugins.g.tsd({
                command: 'reinstall',
                config: paths.tsd
            }, cb);
        });


        plugins.gulp.task("defaultIndexTS", function(){
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

        plugins.gulp.task("defaultTestTS", function(){
            plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                    out: "test.js"
                }))
                .pipe(plugins.gulp.dest(paths.cwd))
        });

        plugins.gulp.task("default",function(cb){
            plugins.g.sequence("defaultTsd","defaultIndexTS","defaultTestTS");
            plugins.beautylog.success("TypeScript for this module was compiled successfully.");
        });

        plugins.gulp.start.apply(plugins.gulp, ['default']);
    }
}
