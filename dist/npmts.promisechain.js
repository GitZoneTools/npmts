"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var NpmtsAssets = require("./npmts.assets");
var NpmtsClean = require("./npmts.clean");
var NpmtsCompile = require("./npmts.compile");
var NpmtsConfigFile = require("./npmts.configfile");
var NpmtsInstall = require("./npmts.install");
var NpmtsJsdoc = require("./npmts.jsdoc");
var NpmtsOptions = require("./npmts.options");
var NpmtsTests = require("./npmts.tests");
exports.run = function () {
    var promisechain;
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsClean.run)
        .then(NpmtsInstall.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsJsdoc.run)
        .then(NpmtsTests.run)
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
    });
    return promisechain;
};
