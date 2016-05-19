/// <reference path="./typings/index.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

export var run = function(configArg){
    var config = configArg;
    var done = plugins.Q.defer();
    /* -------------------------------------------------
     * ----------- install typings ---------------
     * ----------------------------------------------- */
    npmtsOra.text("now installing typings");
    var absoluteTypingsArray = plugins.smartpath.transform.toAbsolute(config.typings,paths.cwd);
    plugins.gulp.src(absoluteTypingsArray)
        .pipe(plugins.g.typings())
        .pipe(plugins.g.gFunction(function(){
            plugins.beautylog.ok("typings installed!");
            done.resolve(config);
        },"atEnd"));
    return done.promise;
};