"use strict";
require('typings-global');
var plugins = require('./npmts.plugins');
var beautylog_1 = require('beautylog');
exports.npmtsOra = new beautylog_1.Ora('setting up TaskChain', 'cyan');
var NpmtsAssets = require('./npmts.assets');
var NpmtsCheck = require('./npmts.check');
var NpmtsClean = require('./npmts.clean');
var NpmtsCompile = require('./npmts.compile');
var NpmtsTypeDoc = require('./npmts.typedoc');
var NpmtsOptions = require('./npmts.options');
var NpmtsTests = require('./npmts.tests');
exports.promisechain = function (argvArg) {
    var done = plugins.Q.defer();
    exports.npmtsOra.start();
    NpmtsOptions.run(argvArg)
        .then(NpmtsClean.run)
        .then(NpmtsCheck.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsTypeDoc.run)
        .then(NpmtsTests.run)
        .then(function (configArg) {
        var shipString = '' +
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
        done.resolve();
    });
    return done.promise;
};
