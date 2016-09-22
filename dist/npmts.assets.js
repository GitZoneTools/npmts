"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    let done = plugins.q.defer();
    let config = configArg;
    npmts_promisechain_1.npmtsOra.text('now looking at ' + 'required assets'.yellow);
    if (config.cli === true) {
        plugins.smartfile.fs.copySync(plugins.path.join(paths.npmtsAssetsDir, 'cli.js'), plugins.path.join(paths.distDir, 'cli.js'));
        plugins.beautylog.ok('installed CLI assets!');
        done.resolve(config);
    }
    else {
        plugins.beautylog.ok('No additional assets required!');
        done.resolve(config);
    }
    return done.promise;
};
