"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    npmts_promisechain_1.npmtsOra.text("now looking at " + "required assets".yellow);
    if (config.cli == true) {
        plugins.smartfile.fs.copySync(plugins.path.join(paths.npmtsAssetsDir, "cli.js"), plugins.path.join(paths.distDir, "cli.js"));
        plugins.beautylog.ok("installed CLI assets!");
        done.resolve(config);
    }
    else {
        plugins.beautylog.ok("No additional assets required!");
        done.resolve(config);
    }
    return done.promise;
};
