/// <reference path="./typings/index.d.ts" />
import plugins = require("./npmts.plugins");

export let npmtsOra = new plugins.beautylog.Ora("setting up TaskChain","cyan");
npmtsOra.start();

import NpmtsAssets = require("./npmts.assets");
import NpmtsClean = require("./npmts.clean");
import NpmtsCompile = require("./npmts.compile");
import NpmtsConfigFile = require("./npmts.configfile");
import NpmtsInstall = require("./npmts.install");
import NpmtsJsdoc = require("./npmts.jsdoc");
import NpmtsOptions = require("./npmts.options");
import NpmtsPublish = require("./npmts.publish");
import NpmtsTests = require("./npmts.tests");

export let promisechain = function(){
    let done = plugins.Q.defer();
    NpmtsConfigFile.run()
        .then(NpmtsOptions.run)
        .then(NpmtsClean.run)
        .then(NpmtsInstall.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsJsdoc.run)
        .then(NpmtsTests.run)
        .then(NpmtsPublish.run)
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
            } else {
                npmtsOra.endOk("Tasks finished!");
                plugins.beautylog.success("Done!");
            }
            done.resolve();
        });
        return done.promise;
};