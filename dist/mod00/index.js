"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ------------------------------------------
 * This module compiles the module's TypeScript files
 * Note: Test files are only compiled in memory
 * -------------------------------------------- */
const q = require("smartq");
const plugins = require("./mod00.plugins");
const NpmtsAssets = require("./mod00.assets");
const NpmtsCheck = require("./mod00.check");
const NpmtsClean = require("./mod00.clean");
const NpmtsCompile = require("./mod00.compile");
exports.run = function (configArg) {
    let done = q.defer();
    plugins.beautylog.ora.text('starting TypeScript Compilation');
    NpmtsClean.run(configArg)
        .then(NpmtsCheck.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(function () {
        done.resolve(configArg);
    });
    return done.promise;
};
