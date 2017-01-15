"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* ------------------------------------------
 * This module tests the compiled TypeScript files
 * -------------------------------------------- */
const plugins = require("./mod02.plugins");
const paths = require("../npmts.paths");
const q = require("q");
const npmts_log_1 = require("../npmts.log");
/**
 * runs mocha
 * @returns INpmtsConfig
 */
let mocha = function (configArg) {
    npmts_log_1.npmtsOra.text('Instrumentalizing and testing transpiled JS');
    npmts_log_1.npmtsOra.end(); // end npmtsOra for tests.
    let done = q.defer();
    let coverageSmartstream = new plugins.smartstream.Smartstream([
        plugins.gulp.src([plugins.path.join(paths.cwd, './ts/**/*.ts')]),
        plugins.gulpSourcemaps.init(),
        plugins.gulpTypeScript({
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            lib: ['ES2015.Promise', 'ES5', 'ES2015.Generator']
        }),
        plugins.gulpIstanbul({}),
        plugins.gulpSourcemaps.write(),
        plugins.gulpFunction.forEach((file) => __awaiter(this, void 0, void 0, function* () {
            file.path = file.path.replace(paths.tsDir, paths.distDir);
        })),
        plugins.gulpInjectModules(),
        plugins.through2.obj((file, enc, cb) => {
            cb();
        }, (cb) => {
            cb();
        })
    ]);
    let localSmartstream = new plugins.smartstream.Smartstream([
        plugins.gulp.src([plugins.path.join(paths.cwd, 'test/test.ts')]),
        plugins.gulpTypeScript({
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            lib: ['ES2015.Promise', 'ES5', 'ES2015.Generator']
        }),
        plugins.gulpInjectModules(),
        plugins.gulpMocha(),
        plugins.gulpIstanbul.writeReports({
            dir: plugins.path.join(paths.cwd, './coverage'),
            reporters: ['lcovonly', 'json', 'text', 'text-summary']
        })
    ]);
    coverageSmartstream.run()
        .then(() => {
        plugins.beautylog.info('code is now transpiled to ES5, instrumented with istanbul, and injected for mocha!');
        return localSmartstream.run()
            .then(() => { done.resolve(configArg); }, (err) => {
            plugins.beautylog.error('Tests failed!');
            console.log(err);
            if (configArg.watch) {
                done.resolve(configArg);
            }
            else {
                process.exit(1);
            }
        });
    }, (err) => {
        console.log(err);
    });
    return done.promise;
};
let coverage = function (configArg) {
    let done = q.defer();
    plugins.smartcov.get.percentage(plugins.path.join(paths.coverageDir, 'lcov.info'), 2)
        .then(function (percentageArg) {
        if (percentageArg >= configArg.coverageTreshold) {
            plugins.beautylog.ok(`${percentageArg.toString()}% `
                + `coverage exceeds your treshold of `
                + `${configArg.coverageTreshold.toString()}%`);
        }
        else {
            plugins.beautylog.warn(`${percentageArg.toString()}% `
                + `coverage fails your treshold of `
                + `${configArg.coverageTreshold.toString()}%`);
            plugins.beautylog.error('exiting due to coverage failure');
            if (!configArg.watch) {
                process.exit(1);
            }
        }
        done.resolve(configArg);
    });
    return done.promise;
};
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    if (config.test === true) {
        npmts_log_1.npmtsOra.text('now starting tests');
        plugins.beautylog.log('------------------------------------------------------\n' +
            '*************************** TESTS: ***************************\n' +
            '--------------------------------------------------------------');
        mocha(config)
            .then(coverage)
            .then(() => {
            done.resolve(config);
        }).catch(err => { console.log(err); });
    }
    else {
        npmts_log_1.npmtsOra.end();
        done.resolve(config);
    }
    return done.promise;
};
