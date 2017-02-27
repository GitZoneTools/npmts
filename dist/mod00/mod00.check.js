"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const projectinfo_1 = require("projectinfo");
const paths = require("../npmts.paths");
const plugins = require("./mod00.plugins");
let checkProjectTypings = (configArg) => {
    let done = q.defer();
    plugins.beautylog.ora.text('Check Module: Check Project Typings...');
    exports.projectInfo = new projectinfo_1.ProjectinfoNpm(paths.cwd);
    if (typeof exports.projectInfo.packageJson.typings === 'undefined') {
        plugins.beautylog.error(`please add typings field to package.json`);
        process.exit(1);
    }
    ;
    done.resolve(configArg);
    return done.promise;
};
const depcheckOptions = {
    ignoreBinPackage: false,
    parsers: {
        '*.ts': plugins.depcheck.parser.typescript
    },
    detectors: [
        plugins.depcheck.detector.requireCallExpression,
        plugins.depcheck.detector.importDeclaration
    ],
    specials: [
        plugins.depcheck.special.eslint,
        plugins.depcheck.special.webpack
    ]
};
let checkDependencies = (configArg) => {
    let done = q.defer();
    plugins.beautylog.ora.text('Check Module: Check Dependencies...');
    let depcheckOptionsMerged = plugins.lodash.merge(depcheckOptions, {
        ignoreDirs: [
            'test',
            'dist',
            'bower_components'
        ],
        ignoreMatches: [
            '@types/*',
            'babel-preset-*'
        ]
    });
    plugins.depcheck(paths.cwd, depcheckOptionsMerged, (unused) => {
        for (let item of unused.dependencies) {
            plugins.beautylog.warn(`Watch out: unused dependency "${item}"`);
        }
        for (let item in unused.missing) {
            plugins.beautylog.error(`missing dependency "${item}" in package.json`);
        }
        if (unused.missing.length > 0) {
            plugins.beautylog.info('exiting due to missing dependencies in package.json');
            process.exit(1);
        }
        for (let item in unused.invalidFiles) {
            plugins.beautylog.warn(`Watch out: could not parse file ${item.red}`);
        }
        ;
        for (let item in unused.invalidDirs) {
            plugins.beautylog.warn(`Watch out: could not parse directory ${item.red}`);
        }
        done.resolve(configArg);
    });
    return done.promise;
};
let checkDevDependencies = (configArg) => {
    let done = q.defer();
    plugins.beautylog.ora.text('Check Module: Check devDependencies...');
    let depcheckOptionsMerged = plugins.lodash.merge(depcheckOptions, {
        ignoreDirs: [
            'ts',
            'dist',
            'bower_components'
        ],
        ignoreMatches: [
            '@types/*',
            'babel-preset-*'
        ]
    });
    plugins.depcheck(paths.cwd, depcheckOptionsMerged, (unused) => {
        for (let item of unused.devDependencies) {
            plugins.beautylog.log(`unused devDependency ${item.red}`);
        }
        for (let item in unused.missing) {
            plugins.beautylog.error(`unused devDependency ${item.red}`);
        }
        if (unused.missing.length > 0) {
            plugins.beautylog.info('exiting due to missing dependencies in package.json');
            process.exit(1);
        }
        for (let item in unused.invalidFiles) {
            plugins.beautylog.warn(`Watch out: could not parse file ${item.red}`);
        }
        for (let item in unused.invalidDirs) {
            plugins.beautylog.warn(`Watch out: could not parse directory ${item.red}`);
        }
        done.resolve(configArg);
    });
    return done.promise;
};
let checkNodeVersion = (configArg) => {
    let done = q.defer();
    plugins.beautylog.ora.text('checking node version');
    done.resolve(configArg);
    return done.promise;
};
exports.run = (configArg) => {
    let done = q.defer();
    plugins.beautylog.ora.text('Check Module: ...');
    checkProjectTypings(configArg)
        .then(checkDependencies)
        .then(checkDevDependencies)
        .then(checkNodeVersion)
        .then(done.resolve)
        .catch((err) => { console.log(err); });
    return done.promise;
};
