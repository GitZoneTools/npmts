"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const NpmtsConfig = require("./npmts.config");
const NpmtsMods = require("./npmts.mods");
const NpmtsWatch = require("./npmts.watch");
const NpmtsShip = require("./npmts.ship");
/**
 * smartanalytics
 * this data is fully anonymized (no Ips or any other personal information is tracked).
 * It just keeps track which of our tools are really used...
 * ... so we know where to spend our limited resources for improving them.
 * Since yarn is out and there is heavy caching going on,
 * pure download stats are just not reliable enough for us anymore
 * Feel free to dig into the smartanalytics package, if you are interested in how it works.
 * It is just an https call to Google Analytics.
 * Our privacy policy can be found here: https://lossless.gmbh/privacy.html
 */
let npmtsAnalytics = new plugins.smartanalytics.AnalyticsAccount('npmts', 'UA-64087619-2');
npmtsAnalytics.sendEvent('npmts', 'exec', 'git.zone');
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
