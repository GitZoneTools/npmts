"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
 * It is just an https call to our own Lossless Analytics API.
 * Our privacy policy can be found here: https://lossless.gmbh/privacy.html
 */
let npmtsAnalytics = new plugins.smartanalytics.Analytics({
    apiEndPoint: 'https://pubapi-1.lossless.one/analytics',
    projectId: 'gitzone',
    appName: 'npmts'
});
process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
    // make the analytics call
    npmtsAnalytics.recordEvent('npmToolExecution', {
        executionMode: (yield NpmtsConfig.configPromise).mode,
        tsOptions: (yield NpmtsConfig.configPromise).tsOptions,
        watch: (yield NpmtsConfig.configPromise).watch,
        coverageTreshold: (yield NpmtsConfig.configPromise).coverageTreshold
    }).catch(err => {
        plugins.beautylog.warn('Lossless Analytics API not available...');
    });
}));
exports.run = () => __awaiter(this, void 0, void 0, function* () {
    let done = q.defer();
    plugins.beautylog.figletSync('NPMTS');
    let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);
    // check for updates
    yield plugins.smartupdate.standardHandler.check('npmts', npmtsProjectInfo.version, 'http://gitzone.gitlab.io/npmts/changelog.html');
    plugins.beautylog.log('---------------------------------------------');
    let npmtsCli = new plugins.smartcli.Smartcli();
    npmtsCli.standardTask()
        .then((argvArg) => {
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
    return yield done.promise;
});
