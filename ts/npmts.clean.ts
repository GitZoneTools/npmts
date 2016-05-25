import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

let removeDist = function(){
    npmtsOra.text("cleaning " + "dist".yellow + " folder");
    return plugins.smartfile.fsaction.remove(paths.distDir);
};

let removeTypings = function(){
    let done = plugins.Q.defer();
    npmtsOra.text("cleaning " + "typings".yellow + " folder");
    if(false){
        //plugins.smartfile.fsaction.remove(paths.typingsDir)
        //    .then(done.resolve);
    } else {
        done.resolve();
    }
    return done.promise;
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