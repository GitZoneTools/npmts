/// <reference path="./index.ts" />
module NpmtsCompile {
    export var run = function(configArg){
        var done = plugins.q.defer();
        var config = configArg;
        plugins.beautylog.log("now running custom tasks");
        var moduleStream = plugins.mergeStream({end: false});
        /* -------------------------------------------------
         * ----------- first install typings ---------------
         * ----------------------------------------------- */
        var typingsDone = plugins.q.defer();
        var typingsCounter:number = 0;
        var typingsCounterAdvance = function(){
            typingsCounter++;
            if(typeof config.typings[typingsCounter] != "undefined"){
                installTypings();
            } else {
                plugins.beautylog.success("custom typings installed successfully");
                typingsDone.resolve();
            }
        };
        var installTypings = function() {
            plugins.beautylog.log("now installing " + "typings.json".yellow + " from " + config.typings[typingsCounter].blue);
            plugins.typings.install({production: false, cwd: plugins.path.join(paths.cwd,config.typings[typingsCounter])})
                .then(function(){
                    typingsCounterAdvance();
                },function(){
                    plugins.beautylog.error("something went wrong: Check if path is correct: " + config.typings[typingsCounter].blue);
                    typingsCounterAdvance();
                });
        };
        installTypings();
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
                        declaration: true,
                        target: "ES5"
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
                    done.resolve(config);
                });
                moduleStream.end();
            });
        });
        return done.promise;
    }
}