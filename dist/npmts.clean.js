"use strict";
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const q = require("q");
const npmts_promisechain_1 = require("./npmts.promisechain");
/**
 * removes the  dist directory which will be entirely rebuild
 */
let removeDist = function () {
    npmts_promisechain_1.npmtsOra.text('cleaning dist folder');
    return plugins.smartfile.fs.remove(paths.distDir);
};
/**
 * remove .d.ts files from testDirctory
 */
let removeTestDeclarations = function () {
    let done = q.defer();
    plugins.smartfile.fs.listFileTree('./test/', '**/*.d.ts').then(fileArray => {
        let fileArrayToRemove = plugins.smartpath.transform.toAbsolute(fileArray, process.cwd() + '//test/');
        plugins.smartfile.fs.removeManySync(fileArrayToRemove);
        done.resolve();
    });
};
/**
 * remove old pages
 */
let removePages = function () {
    npmts_promisechain_1.npmtsOra.text('cleaning pages folder');
    return plugins.smartfile.fs.remove(paths.pagesDir);
};
exports.run = function (configArg) {
    npmts_promisechain_1.npmtsOra.text('cleaning up from previous builds...');
    let done = q.defer();
    removeDist()
        .then(removeTestDeclarations)
        .then(removePages)
        .then(function () {
        plugins.beautylog.ok('Cleaned up from previous builds!');
        done.resolve(configArg);
    });
    return done.promise;
};
