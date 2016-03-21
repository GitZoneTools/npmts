/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");

import NpmtsAssets = require("./npmts.assets");
import NpmtsClean = require("./npmts.clean");
import NpmtsCompile = require("./npmts.compile");
import NpmtsConfigFile = require("./npmts.configfile");
import NpmtsInstall = require("./npmts.install");
import NpmtsJsdoc = require("./npmts.jsdoc");
import NpmtsOptions = require("./npmts.options");
import NpmtsTests = require("./npmts.tests");

export var run = function(){
    var promisechain;
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsClean.run)
        .then(NpmtsInstall.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsJsdoc.run)
        .then(NpmtsTests.run)
        .then(function(configArg){
            let shipString = "" +
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
                "     wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n"
            if (process.env.CI){
                console.log(shipString);
                plugins.beautylog.success("READY TO SHIP!");
            }

        });
    return promisechain;
};