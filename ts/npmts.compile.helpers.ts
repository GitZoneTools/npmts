import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

let outputPathIsDir = function (configArg,keyArg) {
        return plugins.smartpath.check.isDir(plugins.path.join(paths.cwd, configArg.ts[keyArg]));
};

export let checkOutputPath = function(configArg,keyArg){
    if(!outputPathIsDir(configArg,keyArg)) {
        plugins.beautylog.warn("Skipping " + keyArg + " because " + configArg.ts[keyArg] + " it is no directory!")
        return false
    } else {
        return true;
    };
}