/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

export let run = function(configArg){
    npmtsOra.text("cleaning up from previous builds...");
    let done = plugins.Q.defer();
    plugins.smartfile.fsaction.remove(paths.distDir)
        .then(function(){
            plugins.beautylog.ok("Cleaned up from previous builds!");
            done.resolve(configArg);
        });
    return done.promise;
};