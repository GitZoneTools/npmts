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
/* ------------------------------------------
 * This module tests the compiled TypeScript files
 * -------------------------------------------- */
const plugins = require("./mod02.plugins");
const paths = require("../npmts.paths");
const q = require("smartq");
/**
 * runs mocha
 * @returns INpmtsConfig
 */
let tap = function (configArg) {
    let done = q.defer();
    /**
     * the TabBuffer for npmts
     */
    let npmtsTapBuffer = new plugins.tapbuffer.TabBuffer();
    npmtsTapBuffer.setConfig(configArg.testConfig);
    /**
     * handle the testable files
     */
    let testableFilesSmartstream = new plugins.smartstream.Smartstream([
        plugins.smartgulp.src([plugins.path.join(paths.cwd, './ts/**/*.ts')]),
        plugins.gulpSourcemaps.init(),
        plugins.gulpTypeScript({
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            lib: ['DOM', 'ES5', 'ES2015.Promise', 'ES2015.Generator', 'ES2015.Iterable']
        }),
        plugins.gulpFunction.forEach((file) => __awaiter(this, void 0, void 0, function* () {
            file.path = file.path.replace(paths.tsDir, paths.distDir);
        })),
        plugins.gulpSourcemaps.write(),
        npmtsTapBuffer.pipeTestableFiles(),
        plugins.smartstream.cleanPipe()
    ]);
    /**
     * handle the test files
     */
    let testFilesSmartstream = new plugins.smartstream.Smartstream([
        plugins.smartgulp.src([plugins.path.join(paths.cwd, 'test/*.ts')]),
        plugins.gulpSourcemaps.init(),
        plugins.gulpTypeScript({
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            lib: ['DOM', 'ES5', 'ES2015.Promise', 'ES2015.Generator', 'ES2015.Iterable']
        }),
        plugins.gulpSourcemaps.write(),
        npmtsTapBuffer.pipeTestFiles(),
        plugins.smartstream.cleanPipe()
    ]);
    // lets run the smartstream
    Promise.all([
        testableFilesSmartstream.run(),
        testFilesSmartstream.run()
    ]).then(() => __awaiter(this, void 0, void 0, function* () {
        configArg.runData.coverageLcovInfo = yield npmtsTapBuffer.runTests();
        done.resolve(configArg);
    }), (err) => {
        plugins.beautylog.error('Tests failed!');
        console.log(err);
        if (configArg.watch) {
            done.resolve(configArg);
        }
        else {
            process.exit(1);
        }
    });
    return done.promise;
};
let handleCoverageData = (configArg) => __awaiter(this, void 0, void 0, function* () {
    let coverageResult = 0; // the coverage in percent
    if (configArg.runData.coverageLcovInfo) {
        coverageResult = yield plugins.smartcov.get.percentageFromLcovString(configArg.runData.coverageLcovInfo, 2);
    }
    else {
        plugins.beautylog.warn('Hey... Did your tests import and use your module that you are trying to test?');
    }
    if (coverageResult >= configArg.coverageTreshold) {
        plugins.beautylog.ok(`${(coverageResult).toString()}% `
            + `coverage exceeds your treshold of `
            + `${configArg.coverageTreshold.toString()}%`);
    }
    else {
        plugins.beautylog.warn(`${(coverageResult).toString()}% `
            + `coverage fails your treshold of `
            + `${configArg.coverageTreshold.toString()}%`);
        plugins.beautylog.error('exiting due to coverage failure');
        if (!configArg.watch) {
            process.exit(1);
        }
    }
    return configArg;
});
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    if (config.test === true) {
        plugins.beautylog.ora.text('now starting tests');
        plugins.beautylog.ora.end();
        plugins.beautylog.log('ready for tapbuffer:');
        if (configArg.coverage) {
            tap(config)
                .then(handleCoverageData)
                .then(() => {
                done.resolve(config);
            }).catch(err => { console.log(err); });
        }
        else {
            tap(config)
                .then(() => {
                done.resolve(config);
            }).catch(err => { console.log(err); });
        }
    }
    else {
        plugins.beautylog.ora.end();
        done.resolve(config);
    }
    return done.promise;
};
