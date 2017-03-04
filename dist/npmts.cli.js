"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const NpmtsConfig = require("./npmts.config");
const NpmtsMods = require("./npmts.mods");
const NpmtsWatch = require("./npmts.watch");
const NpmtsShip = require("./npmts.ship");
let npmtsAnalytics = new plugins.smartanalytics.AnalyticsAccount('npmts', 'UA-64087619-2');
npmtsAnalytics.sendEvent('npm', 'exec', 'push.rocks');
exports.run = () => {
    let done = q.defer();
    let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);
    let npmtsCli = new plugins.smartcli.Smartcli();
    npmtsCli.standardTask()
        .then((argvArg) => {
        plugins.beautylog.figletSync('NPMTS');
        plugins.beautylog.info('npmts version: ' + npmtsProjectInfo.version);
        return NpmtsConfig.run(argvArg);
    })
        .then((configArg) => {
        let done = q.defer();
        plugins.beautylog.ora.start('loading additional modules...');
        NpmtsMods.mod00.load()
            .then((mod00) => {
            return mod00.run(configArg);
        })
            .then(configArg => {
            let done = q.defer();
            NpmtsMods.mod01.load()
                .then(mod01 => {
                return mod01.run(configArg);
            })
                .then(configArg => {
                done.resolve(configArg);
            });
            return done.promise;
        })
            .then(configArg => {
            let done = q.defer();
            NpmtsMods.mod02.load()
                .then(mod02 => {
                return mod02.run(configArg);
            })
                .then(configArg => {
                done.resolve(configArg);
            });
            return done.promise;
        })
            .then(NpmtsWatch.run)
            .then(NpmtsShip.run);
        return done.promise;
    })
        .catch((err) => { if (err instanceof Error) {
        console.log(err);
    } });
    npmtsCli.addVersion(npmtsProjectInfo.version);
    npmtsCli.startParse();
    return done.promise;
};
