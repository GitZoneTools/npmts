/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

export let run = function(configArg){
    plugins.beautylog.log("now cleaning up from previous builds...");
    let done = plugins.Q.defer();
    plugins.smartfile.fsaction.remove(paths.distDir)
        .then(function(){
            plugins.beautylog.ok("Cleaned up!");
            done.resolve(configArg);
        });
    return done.promise;
};