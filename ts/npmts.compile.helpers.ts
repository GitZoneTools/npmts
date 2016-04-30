import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

let outputPathIsDir = function (configArg,keyArg) {
    try {
        return plugins.fs.statSync(plugins.path.join(paths.cwd, configArg.ts[keyArg])).isDirectory();
    }
    catch (err) {
        return false;
    }
};

export let outputNameSpecified = function (configArg, keyArg) {
    return !outputPathIsDir(configArg,keyArg)
        && (plugins.path.extname(configArg.ts[keyArg]) == ".js");
}

export let outputName = function (configArg, keyArg) {
    if (outputNameSpecified(configArg,keyArg)) {
        return plugins.path.basename(configArg.ts[keyArg])
    } else {
        return undefined
    }
};

export let outputDir = function (configArg, keyArg) {
    if (outputNameSpecified(configArg,keyArg)) {
        return plugins.path.dirname(
            plugins.path.join(paths.cwd, configArg.ts[keyArg])
        )
    } else {
        return plugins.path.join(paths.cwd, configArg.ts[keyArg])
    }
};