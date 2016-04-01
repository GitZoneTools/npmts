"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
exports.run = function (configArg) {
    plugins.beautylog.log("now cleaning up from previous builds...");
    var done = plugins.Q.defer();
    plugins.smartfile.fsaction.remove(paths.distDir)
        .then(function () {
        plugins.beautylog.ok("Cleaned up!");
        done.resolve(configArg);
    });
    return done.promise;
};
