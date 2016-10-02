"use strict";
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const q = require("q");
const npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    npmts_promisechain_1.npmtsOra.text('now compiling ' + 'TypeScript'.yellow);
    plugins.tsn.compileGlobStringObject(config.ts, config.tsOptions, paths.cwd)
        .then(() => {
        plugins.beautylog.ok('compiled main TypeScript!');
        plugins.beautylog.log('now compiling tests!');
        return plugins.tsn.compileGlobStringObject(config.testTs, config.tsOptions, paths.cwd);
    })
        .then(function () {
        plugins.beautylog.ok('compiled all TypeScript!');
        done.resolve(config);
    }).catch(err => { console.log(err); });
    return done.promise;
};
