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
                insert: require("gulp-insert"),
                sequence: require("gulp-sequence"),
                typescript: require("gulp-typescript")
            },
            mergeStream: require("merge2"),
            mocha: require("mocha"),
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
var NpmtsOptions;
(function (NpmtsOptions) {
    NpmtsOptions.config = {};
    NpmtsOptions.run = function () {
        var done = plugins.q.defer();
        var configPath = plugins.path.join(paths.cwd, "npmts.json");
        if (plugins.smartfile.checks.fileExistsSync(configPath)) {
            plugins.beautylog.info("npmts.json".blue + " config file found!");
            NpmtsOptions.config = plugins.smartfile.readFileToObject(configPath);
            switch (NpmtsOptions.config.mode) {
                case "default":
                    plugins.beautylog.log("mode is " + NpmtsOptions.config.mode.yellow);
                    done.resolve();
                    break;
                case "custom":
                    plugins.beautylog.log("mode is " + NpmtsOptions.config.mode.yellow);
                    done.resolve();
                    break;
                default:
                    plugins.beautylog.error("mode " + NpmtsOptions.config.mode.yellow + " not recognised!".red);
            }
            ;
        }
        else {
            plugins.beautylog.log("no config file found: so mode is " + "default".yellow);
            NpmtsOptions.config.mode = "default";
            done.resolve();
        }
        ;
        return done.promise;
    };
})(NpmtsOptions || (NpmtsOptions = {}));
/// <reference path="./index.ts" />
var NpmtsCustom;
(function (NpmtsCustom) {
    NpmtsCustom.run = function () {
        var done = plugins.q.defer();
        var config = NpmtsOptions.config;
        if (config.mode === "custom") {
            plugins.beautylog.log("now running custom tasks");
            var moduleStream = plugins.mergeStream({ end: false });
            /* -------------------------------------------------
             * ----------- first install typings ---------------
             * ----------------------------------------------- */
            var typingsDone = plugins.q.defer();
            var checkTypingsDone = function (indexArg, compareArray) {
                if ((indexArg + 1) == compareArray.length) {
                    plugins.beautylog.success("custom typings installed successfully");
                    typingsDone.resolve();
                }
            };
            for (var key in config.typings) {
                plugins.beautylog.log("now installing " + "typings.json".yellow + " from " + config.typings[key].blue);
                plugins.typings.install({ production: false, cwd: plugins.path.join(paths.cwd, config.typings[key]) })
                    .then(function () {
                    checkTypingsDone(key, config.typings);
                });
            }
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
                    console.log("outputNameSpecified");
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
        }
        return done.promise;
    };
})(NpmtsCustom || (NpmtsCustom = {}));
/// <reference path="./index.ts" />
var NpmtsDefault;
(function (NpmtsDefault) {
    NpmtsDefault.run = function () {
        var done = plugins.q.defer();
        plugins.gulp.task("defaultTypings", function (cb) {
            plugins.beautylog.log("now installing default typings");
            plugins.typings.install({ production: false, cwd: paths.tsDir })
                .then(function () {
                cb();
            });
        });
        plugins.gulp.task("defaultIndexTS", function () {
            plugins.beautylog.log("now compiling" + " ts/index.ts".blue);
            var tsResult = plugins.gulp.src(paths.indexTS)
                .pipe(plugins.g.typescript({
                out: "./index.js",
                declaration: true
            }));
            return plugins.mergeStream([
                tsResult.dts.pipe(plugins.gulp.dest(paths.cwd)),
                tsResult.js
                    .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                    .pipe(plugins.gulp.dest(paths.cwd))
            ]);
        });
        plugins.gulp.task("defaultTestTS", function () {
            plugins.beautylog.log("now compiling" + " ts/test.ts".blue);
            var stream = plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                out: "test.js"
            }))
                .pipe(plugins.gulp.dest(paths.testDir));
            return stream;
        });
        plugins.gulp.task("defaultCleanup", function (cb) {
            plugins.beautylog.success("default TypeScript for this module compiled successfully.");
            done.resolve();
            cb();
        });
        plugins.gulp.task("default", function (cb) {
            if (NpmtsOptions.config.mode == "default") {
                plugins.g.sequence("defaultTypings", "defaultIndexTS", "defaultTestTS", "defaultCleanup", cb);
            }
            else {
                cb();
                done.resolve();
            }
        });
        plugins.gulp.start.apply(plugins.gulp, ['default']);
        return done.promise;
    };
})(NpmtsDefault || (NpmtsDefault = {}));
/// <reference path="./index.ts" />
var NpmtsTests;
(function (NpmtsTests) {
    NpmtsTests.run = function () {
        var done = plugins.q.defer();
        plugins.fs.ensureDirSync(paths.testDir); //make sure that mocha has a directory to look for tests
        plugins.beautylog.info("Now running mocha tests");
        var mocha = new plugins.mocha(); // Instantiate a Mocha instance.
        mocha.addFile(plugins.path.join(paths.testDir, "test.js"));
        mocha.run(function (failures) {
            process.on('exit', function () {
                process.exit(failures);
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
        NpmtsOptions.run()
            .then(NpmtsDefault.run)
            .then(NpmtsCustom.run)
            .then(NpmtsTests.run);
        return promisechain;
    };
})(NpmtsPromisechain || (NpmtsPromisechain = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./npmts.plugins.ts" />
/// <reference path="./npmts.cli.ts" />
/// <reference path="./npmts.paths.ts" />
/// <reference path="./npmts.options.ts" />
/// <reference path="./npmts.custom.ts" />
/// <reference path="./npmts.default.ts" />
/// <reference path="./npmts.tests.ts" />
/// <reference path="./npmts.promisechain.ts" />
console.log("**** starting NPMTS ****");
var plugins = NpmtsPlugins.init();
var paths = NpmtsPaths.init();
var promisechain = NpmtsPromisechain.init();
