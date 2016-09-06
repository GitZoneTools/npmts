"use strict";
require('typings-global');
/* ================================================== *
    Starting NPMTS main process.
 * ================================================== */
var early = require('early');
early.start('NPMTS');
var plugins = require('./npmts.plugins');
var paths = require('./npmts.paths');
var npmts_promisechain_1 = require('./npmts.promisechain');
early.stop()
    .then(function () {
    var npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);
    var npmtsCli = new plugins.smartcli.Smartcli();
    npmtsCli.standardTask()
        .then(function (argvArg) {
        plugins.beautylog.figletSync('NPMTS');
        plugins.beautylog.info('npmts version: ' + npmtsProjectInfo.version);
        try {
            npmts_promisechain_1.promisechain(argvArg);
        }
        catch (err) {
            console.log(err);
        }
    });
    npmtsCli.addVersion(npmtsProjectInfo.version);
    npmtsCli.startParse();
});
