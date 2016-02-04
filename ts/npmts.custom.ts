/// <reference path="./index.ts" />
module NpmtsCustom {
    export var run = function(){
        var done = plugins.q.defer();
        var config = NpmtsOptions.config;
        if(config.mode === "custom"){
            plugins.beautylog.log("now running custom tasks");
            var moduleStream = plugins.mergeStream({end: false});
            /* -------------------------------------------------
             * ----------- first install typings ---------------
             * ----------------------------------------------- */
            var typingsDone = plugins.q.defer();
            var checkTypingsDone = function(indexArg:number,compareArray){
                if((indexArg + 1) == compareArray.length){
                    plugins.beautylog.success("custom typings installed successfully");
                    typingsDone.resolve();
                }
            };
            for (var key in config.typings) {
                plugins.beautylog.log("now installing " + "typings.json".yellow + " from " + config.typings[key].blue);
                plugins.typings.install({production: false, cwd: plugins.path.join(paths.cwd,config.typings[key])})
                    .then(function(){
                        checkTypingsDone(key,config.typings);
                    });
            }
            /* -------------------------------------------------
             * ----------- second compile TS -------------------
             * ----------------------------------------------- */
            typingsDone.promise.then(function(){
                for (var key in config.ts) {
                    plugins.beautylog.log("now compiling" + key.blue);
                    var tsStream = plugins.gulp.src(plugins.path.join(paths.cwd,key))
                        .pipe(plugins.g.typescript({
                            out: plugins.path.basename(config.ts[key]),
                            declaration: true
                        }));
                    var stream = plugins.mergeStream([
                        tsStream.dts.pipe(plugins.gulp.dest(paths.cwd)),
                        tsStream.js
                            .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                            .pipe(plugins.gulp.dest(
                                plugins.path.dirname(
                                    plugins.path.join(paths.cwd,config.ts[key])
                                )
                            ))
                    ]);
                    moduleStream.add(stream);
                }
                moduleStream.on("queueDrain",function(){
                    plugins.beautylog.success("custom TypeScript installed successfully");
                    moduleStream.on("finish",function(){
                        done.resolve();
                    });
                    moduleStream.end();
                });
            });
        }
        return done.promise;
    }
}