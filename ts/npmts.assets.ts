/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

export var run = function(configArg){
    let done = plugins.Q.defer();
    let config = configArg;
    plugins.beautylog.log("now looking at required assets");
    if(config.cli == true){
        plugins.smartfile.copy(plugins.path.join(paths.npmtsAssetsDir,"cli.js"),paths.distDir);
        plugins.beautylog.ok("CLI asset has been installed!");
        done.resolve(config);
    } else {
        done.resolve(config);
    }
    return done.promise;
};