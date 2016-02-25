/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    plugins.beautylog.log("now running custom tasks");
    var moduleStream = plugins.merge2({ end: false });
    /* -------------------------------------------------
     * ----------- first install typings ---------------
     * ----------------------------------------------- */
    var typingsDone = plugins.Q.defer();
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
            var stream = plugins.gulp.src([plugins.path.join(paths.cwd, key), "!**/typings/**"])
                .pipe(plugins.g.sourcemaps.init()) // This means sourcemaps will be generated
                .pipe(plugins.g.typescript({
                out: outputName,
                target: "ES5",
                module: "commonjs"
            }))
                .pipe(plugins.g.sourcemaps.write()) // Now the sourcemaps are added to the .js file
                .pipe(plugins.gulp.dest(outputDir));
            moduleStream.add(stream);
        }
        moduleStream.on("queueDrain", function () {
            plugins.beautylog.success("custom TypeScript installed successfully");
            moduleStream.on("finish", function () {
                done.resolve(config);
            });
            moduleStream.end();
        });
    });
    return done.promise;
};
