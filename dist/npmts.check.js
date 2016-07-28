"use strict";
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
var checkProjectTypings = function (configArg) {
    var done = plugins.Q.defer();
    var cwdProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.cwd);
    if (typeof cwdProjectInfo.packageJson.typings == "undefined") {
        plugins.beautylog.error("please add typings field to package.json");
        process.exit(1);
    }
    ;
    done.resolve(configArg);
    return done.promise;
};
var depcheckOptions = {
    ignoreBinPackage: false,
    parsers: {
        '*.ts': plugins.depcheck.parser.typescript,
    },
    detectors: [
        plugins.depcheck.detector.requireCallExpression,
        plugins.depcheck.detector.importDeclaration
    ],
    specials: [
        plugins.depcheck.special.eslint,
        plugins.depcheck.special.webpack
    ],
};
var checkDependencies = function (configArg) {
    var done = plugins.Q.defer();
    var depcheckOptionsMerged = plugins.lodashObject.merge(depcheckOptions, {
        ignoreDirs: [
            'test',
            'dist',
            'bower_components'
        ],
        ignoreMatches: [
            "@types/*",
            "babel-preset-*"
        ]
    });
    plugins.depcheck(paths.cwd, depcheckOptionsMerged, function (unused) {
        for (var _i = 0, _a = unused.dependencies; _i < _a.length; _i++) {
            var item = _a[_i];
            plugins.beautylog.warn("Watch out: unused dependency " + item.red);
        }
        ;
        for (var _b = 0, _c = unused.missing; _b < _c.length; _b++) {
            var item = _c[_b];
            plugins.beautylog.error("unused devDependency " + item.red);
        }
        ;
        if (unused.missing.length > 0) {
            plugins.beautylog.info("exiting due to missing dependencies in package.json");
            process.exit(1);
        }
        for (var _d = 0, _e = unused.using; _d < _e.length; _d++) {
            var item = _e[_d];
            console.log(item);
        }
        ;
        for (var _f = 0, _g = unused.invalidFiles; _f < _g.length; _f++) {
            var item = _g[_f];
            plugins.beautylog.warn("Watch out: could not parse file " + item.red);
        }
        ;
        for (var _h = 0, _j = unused.invalidDirs; _h < _j.length; _h++) {
            var item = _j[_h];
            plugins.beautylog.warn("Watch out: could not parse directory " + item.red);
        }
        ;
        done.resolve(configArg);
    });
    return done.promise;
};
var checkDevDependencies = function (configArg) {
    var done = plugins.Q.defer();
    var depcheckOptionsMerged = plugins.lodashObject.merge(depcheckOptions, {
        ignoreDirs: [
            'ts',
            'dist',
            'bower_components'
        ],
        ignoreMatches: [
            "@types/*",
            "babel-preset-*"
        ]
    });
    plugins.depcheck(paths.cwd, depcheckOptionsMerged, function (unused) {
        for (var _i = 0, _a = unused.devDependencies; _i < _a.length; _i++) {
            var item = _a[_i];
            plugins.beautylog.log("unused devDependency " + item.red);
        }
        ;
        for (var _b = 0, _c = unused.using; _b < _c.length; _b++) {
            var item = _c[_b];
            console.log(item);
        }
        ;
        for (var _d = 0, _e = unused.invalidFiles; _d < _e.length; _d++) {
            var item = _e[_d];
            plugins.beautylog.warn("Watch out: could not parse file " + item.red);
        }
        ;
        for (var _f = 0, _g = unused.invalidDirs; _f < _g.length; _f++) {
            var item = _g[_f];
            plugins.beautylog.warn("Watch out: could not parse directory " + item.red);
        }
        ;
        done.resolve(configArg);
    });
    return done.promise;
};
var checkNodeVersion = function (configArg) {
    var done = plugins.Q.defer();
    done.resolve(configArg);
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    npmts_promisechain_1.npmtsOra.text("running project checks..."),
        checkProjectTypings(configArg)
            .then(checkDependencies)
            .then(checkDevDependencies)
            .then(checkNodeVersion)
            .then(done.resolve);
    return done.promise;
};