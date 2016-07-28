import "typings-global";
import plugins = require("./npmts.plugins");
import {Ora} from "beautylog"

export let npmtsOra = new plugins.beautylog.Ora("setting up TaskChain","cyan");

import NpmtsAssets = require("./npmts.assets");
import NpmtsCheck = require("./npmts.check");
import NpmtsClean = require("./npmts.clean");
import NpmtsCompile = require("./npmts.compile");
import NpmtsConfigFile = require("./npmts.configfile");
import NpmtsTypeDoc = require("./npmts.typedoc");
import NpmtsOptions = require("./npmts.options");
import NpmtsTests = require("./npmts.tests");

export let promisechain = function(argvArg){
    let done = plugins.Q.defer();
    npmtsOra.start();
    NpmtsConfigFile.run(argvArg)
        .then(NpmtsOptions.run)
        .then(NpmtsClean.run)
        .then(NpmtsCheck.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsTypeDoc.run)
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
            } else {
                plugins.beautylog.success("Done!");
            }
            done.resolve();
        });
        return done.promise;
};