"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ------------------------------------------
 * This module compiles the module's TypeScript files
 * Note: Test files are only compiled in memory
 * -------------------------------------------- */
const q = require("smartq");
const plugins = require("./mod.plugins");
const NpmtsAssets = require("./mod.assets");
const NpmtsCheck = require("./mod.check");
const NpmtsClean = require("./mod.clean");
const NpmtsCompile = require("./mod.compile");
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
