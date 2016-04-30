"use strict";
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var outputPathIsDir = function (configArg, keyArg) {
    return plugins.smartpath.check.isDir(plugins.path.join(paths.cwd, configArg.ts[keyArg]));
};
exports.checkOutputPath = function (configArg, keyArg) {
    if (!outputPathIsDir(configArg, keyArg)) {
        plugins.beautylog.warn("Skipping " + keyArg + " because " + configArg.ts[keyArg] + " it is no directory!");
        return false;
    }
    else {
        return true;
    }
    ;
};
