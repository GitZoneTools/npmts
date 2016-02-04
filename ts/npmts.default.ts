/// <reference path="./index.ts" />

module NpmtsDefault {
    export var run = function() {
        var done = plugins.q.defer();
        plugins.gulp.task("defaultTypings",function(cb){
            plugins.beautylog.log("now installing default typings");
            plugins.typings.install({production: false, cwd: paths.tsDir})
                .then(function(){
                    cb();
                });
        });
        plugins.gulp.task("defaultIndexTS", function(){
            plugins.beautylog.log("now compiling" + " ts/index.ts".blue);
            var tsResult = plugins.gulp.src(paths.indexTS)
                .pipe(plugins.g.typescript({
                    out:"./index.js",
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
            var stream = plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                    out: "test.js"
                }))
                .pipe(plugins.gulp.dest(paths.testDir));
            return stream;
        });

        plugins.gulp.task("defaultCleanup",function(cb){
            plugins.beautylog.success("default TypeScript for this module compiled successfully.");
            done.resolve();
            cb();
        });

        plugins.gulp.task("default",function(cb){
            if(NpmtsOptions.config.mode == "default"){
                plugins.g.sequence("defaultTypings","defaultIndexTS","defaultTestTS","defaultCleanup",cb);
            } else {
                cb();
                done.resolve();
            }

        });

        plugins.gulp.start.apply(plugins.gulp, ['default']);
        return done.promise;
    }
}
