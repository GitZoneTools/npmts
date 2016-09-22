"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const beautylog_1 = require("beautylog");
exports.npmtsOra = new beautylog_1.Ora('setting up TaskChain', 'cyan');
const NpmtsAssets = require("./npmts.assets");
const NpmtsCheck = require("./npmts.check");
const NpmtsClean = require("./npmts.clean");
const NpmtsCompile = require("./npmts.compile");
const NpmtsTypeDoc = require("./npmts.typedoc");
const NpmtsOptions = require("./npmts.options");
const NpmtsTests = require("./npmts.tests");
const NpmtsWatch = require("./npmts.watch");
exports.run = function (argvArg) {
    let done = plugins.q.defer();
    exports.npmtsOra.start();
    NpmtsOptions.run(argvArg)
        .then(NpmtsClean.run)
        .then(NpmtsCheck.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsTypeDoc.run)
        .then(NpmtsTests.run)
        .then(NpmtsWatch.run)
        .then(function (configArg) {
        let shipString = '' +
            '\n' +
            '\n' +
            '                                         # #  ( )\n' +
            '                                      ___#_#___|__\n' +
            '                                  _  |____________|  _\n' +
            '                           _=====| | |            | | |==== _\n' +
            '                     =====| |.---------------------------. | |====\n' +
            "       <--------------------'   .  .  .  .  .  .  .  .   '--------------/\n" +
            '         \\                                                             /\n' +
            '          \\___________________________________________________________/\n' +
            '    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n' +
            '   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n' +
            '     wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n';
        if (process.env.CI) {
            console.log(shipString);
            plugins.beautylog.success('READY TO SHIP!');
        }
        else {
            plugins.beautylog.success('Done!');
        }
        done.resolve(configArg);
    });
    return done.promise;
};
