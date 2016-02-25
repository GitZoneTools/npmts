/// <reference path="./typings/main.d.ts" />
var NpmtsConfigFile = require("./npmts.configfile");
var NpmtsOptions = require("./npmts.options");
var NpmtsCompile = require("./npmts.compile");
var NpmtsJsdoc = require("./npmts.jsdoc");
var NpmtsTests = require("./npmts.tests");
exports.run = function () {
    var promisechain;
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsCompile.run)
        .then(NpmtsJsdoc.run)
        .then(NpmtsTests.run);
    return promisechain;
};
