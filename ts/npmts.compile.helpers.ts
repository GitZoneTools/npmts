import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

let outputPathIsDir = function (tsArrayArg,keyArg) {
        return plugins.smartpath.check.isDir(plugins.path.join(paths.cwd, tsArrayArg[keyArg]));
};

export let checkOutputPath = function(tsArrayArg,keyArg){
    if(!outputPathIsDir(tsArrayArg,keyArg)) {
        plugins.beautylog.warn("Skipping " + keyArg + " because " + tsArrayArg[keyArg] + " it is no directory!")
        return false
    } else {
        return true;
    };
}