"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const paths = require("../npmts.paths");
const plugins = require("./mod.plugins");
const mod_check_1 = require("../mod_compile/mod.check");
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    plugins.beautylog.ora.text('now looking at ' + 'required assets');
    if (config.cli === true) {
        let mainJsPath = mod_check_1.projectInfo.packageJson.main;
        let cliJsString = plugins.smartfile.fs.toStringSync(plugins.path.join(paths.npmtsAssetsDir, 'cli.js'));
        cliJsString = cliJsString.replace('{{pathToIndex}}', mainJsPath);
        plugins.smartfile.memory.toFsSync(cliJsString, plugins.path.join(paths.distDir, 'cli.js'));
        plugins.beautylog.ok('installed CLI assets!');
        done.resolve(config);
    }
    else {
        plugins.beautylog.ok('No additional assets required!');
        done.resolve(config);
    }
    return done.promise;
};
