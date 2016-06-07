"use strict";
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var outputPathIsDir = function (tsArrayArg, keyArg) {
    return plugins.smartpath.check.isDir(plugins.path.join(paths.cwd, tsArrayArg[keyArg]));
};
exports.checkOutputPath = function (tsArrayArg, keyArg) {
    if (!outputPathIsDir(tsArrayArg, keyArg)) {
        plugins.beautylog.warn("Skipping " + keyArg + " because " + tsArrayArg[keyArg] + " it is no directory!");
        return false;
    }
    else {
        return true;
    }
    ;
};
