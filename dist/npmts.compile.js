"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    npmts_promisechain_1.npmtsOra.text('now compiling ' + 'TypeScript'.yellow);
    plugins.tsn.compileGlobStringObject(config.ts, config.tsOptions, paths.cwd)
        .then(function () {
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
