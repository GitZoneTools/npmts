"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    let done = plugins.q.defer();
    let config = configArg;
    npmts_promisechain_1.npmtsOra.text('now compiling ' + 'TypeScript'.yellow);
    plugins.tsn.compileGlobStringObject(config.ts, config.tsOptions, paths.cwd)
        .then(() => {
        plugins.beautylog.ok('compiled main TypeScript!');
        plugins.beautylog.log('now compiling tests!');
        return plugins.tsn.compileGlobStringObject(config.testTs);
    })
        .then(function () {
        plugins.beautylog.ok('compiled all TypeScript!');
        done.resolve(config);
    });
    return done.promise;
};
