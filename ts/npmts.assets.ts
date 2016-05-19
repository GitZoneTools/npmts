/// <reference path="./typings/index.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

export var run = function(configArg){
    let done = plugins.Q.defer();
    let config = configArg;
    npmtsOra.text("now looking at " + "required assets".yellow);
    if(config.cli == true){
        plugins.smartfile.fsaction.copy(plugins.path.join(paths.npmtsAssetsDir,"cli.js"),paths.distDir);
        plugins.beautylog.ok("installed CLI assets!");
        done.resolve(config);
    } else {
        done.resolve(config);
    }
    return done.promise;
};