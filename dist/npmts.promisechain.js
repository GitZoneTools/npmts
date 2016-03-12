"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var NpmtsConfigFile = require("./npmts.configfile");
var NpmtsOptions = require("./npmts.options");
var NpmtsInstall = require("./npmts.install");
var NpmtsCompile = require("./npmts.compile");
var NpmtsJsdoc = require("./npmts.jsdoc");
var NpmtsTests = require("./npmts.tests");
exports.run = function () {
    var promisechain;
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsInstall.run)
        .then(NpmtsCompile.run)
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
        console.log(shipString);
        plugins.beautylog.success("READY TO SHIP!");
    });
    return promisechain;
};
