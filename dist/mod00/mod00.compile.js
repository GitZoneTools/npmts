"use strict";
const q = require("smartq");
const paths = require("../npmts.paths");
const npmts_log_1 = require("../npmts.log");
const plugins = require("./mod00.plugins");
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    npmts_log_1.npmtsOra.text('now compiling ' + 'TypeScript'.yellow);
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
