/// <reference path="./typings/index.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

let removeDist = function(){
    return plugins.smartfile.fsaction.remove(paths.distDir);
};

let removeTypings = function(){
    return plugins.smartfile.fsaction.remove(paths.distDir);
};

export let run = function(configArg){
    npmtsOra.text("cleaning up from previous builds...");
    let done = plugins.Q.defer();
    removeDist()
        .then(removeTypings)
        .then(function(){
            plugins.beautylog.ok("Cleaned up from previous builds!");
            done.resolve(configArg);
        });
    return done.promise;
};