"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
let removeDist = function () {
    npmts_promisechain_1.npmtsOra.text('cleaning dist folder');
    return plugins.smartfile.fs.remove(paths.distDir);
};
let removePages = function () {
    npmts_promisechain_1.npmtsOra.text('cleaning pages folder');
    return plugins.smartfile.fs.remove(paths.pagesDir);
};
exports.run = function (configArg) {
    npmts_promisechain_1.npmtsOra.text('cleaning up from previous builds...');
    let done = plugins.q.defer();
    removeDist()
        .then(removePages)
        .then(function () {
        plugins.beautylog.ok('Cleaned up from previous builds!');
        done.resolve(configArg);
    });
    return done.promise;
};
