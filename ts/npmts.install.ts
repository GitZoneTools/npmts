/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
export var run = function(configArg){
    var config = configArg;
    var done = plugins.Q.defer();
    /* -------------------------------------------------
     * ----------- install typings ---------------
     * ----------------------------------------------- */
    plugins.beautylog.log("now installing " + "typings".yellow);
    let absoluteTypingsArray = plugins.smartpath.transform.toAbsolute(config.typings,paths.cwd);
    plugins.gulp.src(absoluteTypingsArray)
        .pipe(plugins.g.typings())
        .pipe(plugins.g.gFunction(function(){
            plugins.beautylog.ok("typings have been installed!");
            done.resolve(config);
        },"atEnd"));
    return done.promise;
};