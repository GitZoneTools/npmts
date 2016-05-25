"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
exports.npmtsOra = new plugins.beautylog.Ora("setting up TaskChain", "cyan");
exports.npmtsOra.start();
var NpmtsAssets = require("./npmts.assets");
var NpmtsClean = require("./npmts.clean");
var NpmtsCompile = require("./npmts.compile");
var NpmtsConfigFile = require("./npmts.configfile");
var NpmtsInstall = require("./npmts.install");
var NpmtsJsdoc = require("./npmts.jsdoc");
var NpmtsOptions = require("./npmts.options");
var NpmtsPublish = require("./npmts.publish");
var NpmtsTests = require("./npmts.tests");
exports.promisechain = function () {
    var done = plugins.Q.defer();
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsClean.run)
        .then(NpmtsInstall.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsJsdoc.run)
        .then(NpmtsTests.run)
        .then(NpmtsPublish.run)
        .then(function (configArg) {
        var shipString = "" +
            "\n" +
            "\n" +
            "                                         # #  ( )\n" +
            "                                      ___#_#___|__\n" +
            "                                  _  |____________|  _\n" +
            "                           _=====| | |            | | |==== _\n" +
            "                     =====| |.---------------------------. | |====\n" +
            "       <--------------------'   .  .  .  .  .  .  .  .   '--------------/\n" +
            "         \\                                                             /\n" +
            "          \\___________________________________________________________/\n" +
            "    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n" +
            "   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n" +
            "     wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n";
        if (process.env.CI) {
            console.log(shipString);
            plugins.beautylog.success("READY TO SHIP!");
        }
        else {
            plugins.beautylog.success("Done!");
        }
        done.resolve();
    });
    return done.promise;
};
