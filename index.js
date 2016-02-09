#!/usr/bin/env node

/// <reference path="./index.ts" />
var NpmtsPlugins;
(function (NpmtsPlugins) {
    NpmtsPlugins.init = function () {
        var plugins = {
            beautylog: require("beautylog"),
            fs: require("fs-extra"),
            gulp: require("gulp"),
            g: {
                coveralls: require("gulp-coveralls"),
                if: require("gulp-if"),
                insert: require("gulp-insert"),
                istanbul: require("gulp-istanbul"),
                mocha: require("gulp-mocha"),
                typescript: require("gulp-typescript")
            },
            mergeStream: require("merge2"),
            path: require("path"),
            q: require("q"),
            smartcli: require("smartcli"),
            smartfile: require("smartfile"),
            typings: require("typings")
        };
        return plugins;
    };
})(NpmtsPlugins || (NpmtsPlugins = {}));
/// <reference path="./index.ts" /> 
/// <reference path="./index.ts" />
var NpmtsPaths;
(function (NpmtsPaths) {
    NpmtsPaths.init = function () {
        var paths = {};
        paths.cwd = plugins.smartcli.get.cwd().path;
        paths.tsDir = plugins.path.join(paths.cwd, "ts/");
        paths.indexTS = plugins.path.join(paths.cwd, "ts/index.ts");
        paths.testTS = plugins.path.join(paths.cwd, "ts/test.ts");
        paths.testDir = plugins.path.join(paths.cwd, "test/");
        return paths;
    };
})(NpmtsPaths || (NpmtsPaths = {}));
/// <reference path="./index.ts" />
var NpmtsConfigFile;
(function (NpmtsConfigFile) {
    NpmtsConfigFile.run = function () {
        var done = plugins.q.defer();
        var config = {};
        var configPath = plugins.path.join(paths.cwd, "npmts.json");
        if (plugins.smartfile.checks.fileExistsSync(configPath)) {
            plugins.beautylog.info("npmts.json".blue + " config file found!");
            config = plugins.smartfile.readFileToObject(configPath);
            switch (config.mode) {
                case "default":
                case "custom":
                    plugins.beautylog.log("mode is " + config.mode.yellow);
                    done.resolve(config);
                    break;
                default:
                    plugins.beautylog.error("mode " + config.mode.yellow + " not recognised!".red);
            }
            ;
        }
        else {
            plugins.beautylog.log("no config file found: so mode is " + "default".yellow);
            config.mode = "default";
            done.resolve(config);
        }
        ;
        return done.promise;
    };
})(NpmtsConfigFile || (NpmtsConfigFile = {}));
/// <reference path="./index.ts" />
var NpmtsOptions;
(function (NpmtsOptions) {
    NpmtsOptions.run = function (configArg) {
        var done = plugins.q.defer();
        var config = configArg;
        if (typeof config.coveralls === "undefined") {
            config.coveralls = true;
        }
        if (config.mode == "default") {
            config.typings = [
                "./ts/"
            ];
            config.ts = (_a = {},
                _a["./ts/index.ts"] = "./index.js",
                _a
            );
            config.test = ["./index.js"];
            done.resolve(config);
        }
        else {
            done.resolve(config);
        }
        return done.promise;
        var _a;
    };
})(NpmtsOptions || (NpmtsOptions = {}));
/// <reference path="./index.ts" />
var NpmtsCompile;
(function (NpmtsCompile) {
    NpmtsCompile.run = function (configArg) {
        var done = plugins.q.defer();
        var config = configArg;
        plugins.beautylog.log("now running custom tasks");
        var moduleStream = plugins.mergeStream({ end: false });
        /* -------------------------------------------------
         * ----------- first install typings ---------------
         * ----------------------------------------------- */
        var typingsDone = plugins.q.defer();
        var typingsCounter = 0;
        var typingsCounterAdvance = function () {
            typingsCounter++;
            if (typeof config.typings[typingsCounter] != "undefined") {
                installTypings();
            }
            else {
                plugins.beautylog.success("custom typings installed successfully");
                typingsDone.resolve();
            }
        };
        var installTypings = function () {
            plugins.beautylog.log("now installing " + "typings.json".yellow + " from " + config.typings[typingsCounter].blue);
            plugins.typings.install({ production: false, cwd: plugins.path.join(paths.cwd, config.typings[typingsCounter]) })
                .then(function () {
                typingsCounterAdvance();
            }, function () {
                plugins.beautylog.error("something went wrong: Check if path is correct: " + config.typings[typingsCounter].blue);
                typingsCounterAdvance();
            });
        };
        installTypings();
        /* -------------------------------------------------
         * ----------- second compile TS -------------------
         * ----------------------------------------------- */
        typingsDone.promise.then(function () {
            for (var key in config.ts) {
                plugins.beautylog.log("now compiling" + key.blue);
                var outputPathIsDir;
                try {
                    if (plugins.fs.statSync(plugins.path.join(paths.cwd, config.ts[key])).isDirectory()) {
                        outputPathIsDir = true;
                    }
                }
                catch (err) {
                    outputPathIsDir = false;
                }
                //do some evaluation of the environment
                var outputNameSpecified = (!outputPathIsDir
                    && (plugins.path.extname(config.ts[key]) == ".js"));
                var outputName = (function () {
                    if (outputNameSpecified) {
                        return plugins.path.basename(config.ts[key]);
                    }
                    else {
                        return undefined;
                    }
                })();
                var outputDir = (function () {
                    if (outputNameSpecified) {
                        return plugins.path.dirname(plugins.path.join(paths.cwd, config.ts[key]));
                    }
                    else {
                        return plugins.path.join(paths.cwd, config.ts[key]);
                    }
                })();
                var tsStream = plugins.gulp.src(plugins.path.join(paths.cwd, key))
                    .pipe(plugins.g.typescript({
                    out: outputName,
                    declaration: true
                }));
                var stream = plugins.mergeStream([
                    tsStream.dts.pipe(plugins.gulp.dest(outputDir)),
                    tsStream.js
                        .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                        .pipe(plugins.gulp.dest(outputDir))
                ]);
                moduleStream.add(stream);
            }
            moduleStream.on("queueDrain", function () {
                plugins.beautylog.success("custom TypeScript installed successfully");
                moduleStream.on("finish", function () {
                    done.resolve();
                });
                moduleStream.end();
            });
        });
        return done.promise;
    };
})(NpmtsCompile || (NpmtsCompile = {}));
/// <reference path="./index.ts" />
var NpmtsTests;
(function (NpmtsTests) {
    NpmtsTests.run = function (configArg) {
        var done = plugins.q.defer();
        var config = configArg;
        var istanbul = function () {
            var stream = plugins.gulp.src([plugins.path.join(paths.cwd, "index.js")])
                .pipe(plugins.g.istanbul())
                .pipe(plugins.g.istanbul.hookRequire());
            return stream;
        };
        var mocha = function () {
            var stream = plugins.gulp.src(["./test/test.js"])
                .pipe(plugins.g.mocha())
                .pipe(plugins.g.istanbul.writeReports())
                .pipe(plugins.g.istanbul.enforceThresholds({ thresholds: { global: 30 } }));
            return stream;
        };
        var coveralls = function () {
            var stream = plugins.gulp.src("./coverage/**/lcov.info")
                .pipe(plugins.g.if((process.env.TRAVIS && config.coveralls), plugins.g.coveralls()));
            return stream;
        };
        istanbul().on("finish", function () {
            mocha().on("finish", function () {
                coveralls().on("finish", function () {
                    done.resolve(config);
                });
            });
        });
        return done.promise;
    };
})(NpmtsTests || (NpmtsTests = {}));
/// <reference path="./index.ts" />
var NpmtsPromisechain;
(function (NpmtsPromisechain) {
    NpmtsPromisechain.init = function () {
        var promisechain;
        NpmtsConfigFile.run()
            .then(NpmtsOptions.run)
            .then(NpmtsCompile.run)
            .then(NpmtsTests.run);
        return promisechain;
    };
})(NpmtsPromisechain || (NpmtsPromisechain = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./npmts.plugins.ts" />
/// <reference path="./npmts.cli.ts" />
/// <reference path="./npmts.paths.ts" />
/// <reference path="./npmts.configfile.ts" />
/// <reference path="./npmts.options.ts" />
/// <reference path="./npmts.compile.ts" />
/// <reference path="./npmts.tests.ts" />
/// <reference path="./npmts.promisechain.ts" />
console.log("**** starting NPMTS ****");
var plugins = NpmtsPlugins.init();
var paths = NpmtsPaths.init();
var promisechain = NpmtsPromisechain.init();
