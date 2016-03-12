/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
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
            console.log(shipString);
            plugins.beautylog.success("READY TO SHIP!");
        });
    return promisechain;
};