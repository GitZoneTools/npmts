"use strict";
/// <reference path="./typings/index.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
var removeDist = function () {
    npmts_promisechain_1.npmtsOra.text("cleaning " + "dist".yellow + " folder");
    return plugins.smartfile.fsaction.remove(paths.distDir);
};
var removeTypings = function () {
    npmts_promisechain_1.npmtsOra.text("cleaning " + "typings".yellow + " folder");
    return plugins.smartfile.fsaction.remove(paths.typingsDir);
};
exports.run = function (configArg) {
    npmts_promisechain_1.npmtsOra.text("cleaning up from previous builds...");
    var done = plugins.Q.defer();
    removeDist()
        .then(removeTypings)
        .then(function () {
        plugins.beautylog.ok("Cleaned up from previous builds!");
        done.resolve(configArg);
    });
    return done.promise;
};
