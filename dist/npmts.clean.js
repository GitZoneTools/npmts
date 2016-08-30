"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
var removeDist = function () {
    npmts_promisechain_1.npmtsOra.text("cleaning dist folder");
    return plugins.smartfile.fs.remove(paths.distDir);
};
var removePages = function () {
    npmts_promisechain_1.npmtsOra.text("cleaning pages folder");
    return plugins.smartfile.fs.remove(paths.pagesDir);
};
exports.run = function (configArg) {
    npmts_promisechain_1.npmtsOra.text("cleaning up from previous builds...");
    var done = plugins.Q.defer();
    removeDist()
        .then(removePages)
        .then(function () {
        plugins.beautylog.ok("Cleaned up from previous builds!");
        done.resolve(configArg);
    });
    return done.promise;
};
