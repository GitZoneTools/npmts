"use strict";
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const q = require("q");
const npmts_promisechain_1 = require("./npmts.promisechain");
const npmts_check_1 = require("./npmts.check");
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    npmts_promisechain_1.npmtsOra.text('now looking at ' + 'required assets'.yellow);
    if (config.cli === true) {
        let mainJsPath = npmts_check_1.projectInfo.packageJson.main;
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
