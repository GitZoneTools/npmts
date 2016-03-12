/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
export var run = function(configArg){
    var done = plugins.Q.defer();
    var config = configArg;
    plugins.beautylog.log("now compiling " + "TypeScript".yellow);
    var moduleStream = plugins.merge2({end: false});

    /* -------------------------------------------------
     * ----------- compile TypeScript --------------------------
     * ----------------------------------------------- */
    for (var key in config.ts) {
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

        var stream = plugins.gulp.src([plugins.path.join(paths.cwd,key),"!**/typings/**"])
            .pipe(plugins.g.sourcemaps.init()) // This means sourcemaps will be generated
            .pipe(plugins.g.typescript({
                out: outputName,
                target: "ES5",
                module: "commonjs"
            }))
            .pipe(plugins.g.sourcemaps.write()) // Now the sourcemaps are added to the .js file
            //.pipe(plugins.g.header('#!/usr/bin/env node\n\n'))
            .pipe(plugins.gulp.dest(outputDir));
        moduleStream.add(stream);
    }
    moduleStream.on("queueDrain",function(){
        plugins.beautylog.ok("TypeScript is compiled!");
        moduleStream.on("finish",function(){
            done.resolve(config);
        });
        moduleStream.end();
    });
    /*==================== END TYPESCRIPT =====================*/



    return done.promise;
};
