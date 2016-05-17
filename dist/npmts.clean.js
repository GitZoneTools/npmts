"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    npmts_promisechain_1.npmtsOra.text("cleaning up from previous builds...");
    var done = plugins.Q.defer();
    plugins.smartfile.fsaction.remove(paths.distDir)
        .then(function () {
        plugins.beautylog.ok("Cleaned up from previous builds!");
        done.resolve(configArg);
    });
    return done.promise;
};
