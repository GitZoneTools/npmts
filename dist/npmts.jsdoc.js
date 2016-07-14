"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
var genEsDoc = function (configArg) {
    var done = plugins.Q.defer();
    npmts_promisechain_1.npmtsOra.text("now generating " + "EsDoc documentation".yellow);
    plugins.beautylog.log("ESDoc Output:");
    var esdocConfig = {
        source: paths.distDir,
        destination: paths.docsDir
    };
    plugins.esdoc.generate(esdocConfig, plugins.esdocPublisher);
    plugins.beautylog.ok("Docs by EsDoc have been created!");
    done.resolve(configArg);
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    genEsDoc(configArg)
        .then(function () {
        done.resolve(configArg);
    });
    return done.promise;
};
