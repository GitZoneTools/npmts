/* ================================================== *
    **** NPMTS ****
    Fabulous TypeScript development
 * ================================================== */
"use strict";
const early = require("early");
early.start('NPMTS');
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const promisechain = require("./npmts.promisechain");
early.stop()
    .then(() => {
    let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);
    let npmtsCli = new plugins.smartcli.Smartcli();
    npmtsCli.standardTask()
        .then((argvArg) => {
        plugins.beautylog.figletSync('NPMTS');
        plugins.beautylog.info('npmts version: ' + npmtsProjectInfo.version);
        promisechain.run(argvArg).catch((err) => { console.log(err); });
    });
    npmtsCli.addVersion(npmtsProjectInfo.version);
    npmtsCli.startParse();
});
