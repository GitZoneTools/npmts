import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";
export var run = function(argvArg){
    let done = plugins.Q.defer();
    npmtsOra.text("looking for npmextra.json");
    let defaultConfig = {
        mode: "default",
        notest:false,
        nodocs:false
    };
    if(argvArg.notest){
        defaultConfig.notest = true;
    };
    if(argvArg.nodocs){
        defaultConfig.nodocs = true;
    };
    let config = plugins.npmextra.dataFor({
        toolName:"npmts",
        defaultSettings:defaultConfig,
        cwd:paths.cwd
    });
    switch (config.mode){
        case "default":
        case "custom":
            plugins.beautylog.ok("mode is " + config.mode.yellow);
            done.resolve(config);
            break;
        default:
            plugins.beautylog.error("mode " + config.mode.yellow + " not recognised!".red);
            process.exit(1);
    };
    done.resolve(config);
    return done.promise;
};