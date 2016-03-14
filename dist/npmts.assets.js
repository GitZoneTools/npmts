"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    plugins.beautylog.log("now looking at required assets");
    if (config.cli == true) {
        plugins.smartfile.copy(plugins.path.join(paths.npmtsAssetsDir, "cli.js"), paths.distDir);
        plugins.beautylog.ok("CLI asset has been installed!");
        done.resolve(config);
    }
    else {
        done.resolve(config);
    }
    return done.promise;
};
