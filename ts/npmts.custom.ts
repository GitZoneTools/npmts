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
                    var outputPathIsDir:boolean;
                    try {
                        if(plugins.fs.statSync(plugins.path.join(paths.cwd,config.ts[key])).isDirectory()){
                            outputPathIsDir = true;
                        }
                    }
                    catch(err) {
                        outputPathIsDir = false;
                    }
                    //do some evaluation of the environment
                    var outputNameSpecified:boolean = (
                        !outputPathIsDir
                        && (plugins.path.extname(config.ts[key]) == ".js")
                    );
                    console.log("outputNameSpecified");
                    var outputName = (function(){
                        if(outputNameSpecified){
                            return plugins.path.basename(config.ts[key])
                        } else {
                            return undefined
                        }
                    })();
                    var outputDir = (function(){
                        if(outputNameSpecified){
                            return plugins.path.dirname(
                                plugins.path.join(paths.cwd,config.ts[key])
                            )
                        } else {
                            return plugins.path.join(paths.cwd,config.ts[key])
                        }
                    })();

                    var tsStream = plugins.gulp.src(plugins.path.join(paths.cwd,key))
                        .pipe(plugins.g.typescript({
                            out: outputName,
                            declaration: true
                        }));
                    var stream = plugins.mergeStream([
                        tsStream.dts.pipe(plugins.gulp.dest(outputDir)),
                        tsStream.js
                            .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                            .pipe(plugins.gulp.dest(outputDir))
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