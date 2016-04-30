"use strict";
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var outputPathIsDir = function (configArg, keyArg) {
    try {
        return plugins.fs.statSync(plugins.path.join(paths.cwd, configArg.ts[keyArg])).isDirectory();
    }
    catch (err) {
        return false;
    }
};
exports.outputNameSpecified = function (configArg, keyArg) {
    return !outputPathIsDir(configArg, keyArg)
        && (plugins.path.extname(configArg.ts[keyArg]) == ".js");
};
exports.outputName = function (configArg, keyArg) {
    if (exports.outputNameSpecified(configArg, keyArg)) {
        return plugins.path.basename(configArg.ts[keyArg]);
    }
    else {
        return undefined;
    }
};
exports.outputDir = function (configArg, keyArg) {
    if (exports.outputNameSpecified(configArg, keyArg)) {
        return plugins.path.dirname(plugins.path.join(paths.cwd, configArg.ts[keyArg]));
    }
    else {
        return plugins.path.join(paths.cwd, configArg.ts[keyArg]);
    }
};
