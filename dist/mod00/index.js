"use strict";
/* ------------------------------------------
 * This module compiles TypeScript files
 * -------------------------------------------- */
const q = require("smartq");
const npmts_log_1 = require("../npmts.log");
const NpmtsAssets = require("./mod00.assets");
const NpmtsCheck = require("./mod00.check");
const NpmtsClean = require("./mod00.clean");
const NpmtsCompile = require("./mod00.compile");
exports.run = function (configArg) {
    let done = q.defer();
    npmts_log_1.npmtsOra.text('starting TypeScript Compilation');
    NpmtsClean.run(configArg)
        .then(NpmtsCheck.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(function () {
        done.resolve(configArg);
    });
    return done.promise;
};
