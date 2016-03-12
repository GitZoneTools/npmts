/// <reference path="./typings/main.d.ts" />
import NpmtsConfigFile = require("./npmts.configfile");
import NpmtsOptions = require("./npmts.options");
import NpmtsInstall = require("./npmts.install");
import NpmtsCompile = require("./npmts.compile");
import NpmtsJsdoc = require("./npmts.jsdoc");
import NpmtsTests = require("./npmts.tests");
export var run = function(){
    var promisechain;
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsInstall.run)
        .then(NpmtsCompile.run)
        .then(NpmtsJsdoc.run)
        .then(NpmtsTests.run);
    return promisechain;
};