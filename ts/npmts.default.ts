/// <reference path="./index.ts" />

module NpmtsDefault {
    export var init = function() {
        plugins.gulp.task("defaultTsd",function(cb){
            plugins.beautylog.log("now installing typings from" + " ts/tsd.json".blue);
            plugins.g.if(process.env.TRAVIS,
                plugins.g.tsd({
                    command: 'reinstall',
                    config: paths.tsd
                }, cb)
            )
            ;
        });


        plugins.gulp.task("defaultIndexTS", function(){
            plugins.beautylog.log("now compiling" + " ts/index.ts".blue);
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
            plugins.beautylog.log("now compiling" + " ts/test.ts".blue);
            plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                    out: "test.js"
                }))
                .pipe(plugins.gulp.dest(paths.cwd))
        });

        plugins.gulp.task("defaultCleanup",function(cb){
            plugins.beautylog.success("TypeScript for this module compiled successfully.");
            cb();
        });

        plugins.gulp.task("default",function(cb){
            plugins.g.sequence("defaultTsd","defaultIndexTS","defaultTestTS","defaultCleanup",cb);
        });

        plugins.gulp.start.apply(plugins.gulp, ['default']);
    }
}
