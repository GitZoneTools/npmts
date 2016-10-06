"use strict";
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const promisechain = require("./npmts.promisechain");
const q = require("q");
exports.run = () => {
    let done = q.defer();
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
    return done.promise;
};
