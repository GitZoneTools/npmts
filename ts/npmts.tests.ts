import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

/**
 *
 * @returns {*}
 */
let istanbul = function (configArg) {
    npmtsOra.text("Instrumentalizing transpiled JS...");
    let done = plugins.Q.defer();
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd,"dist/*.js")])
        .pipe(plugins.g.sourcemaps.init())
        .pipe(plugins.g.istanbul()) // Covering files
        .pipe(plugins.g.sourcemaps.write())
        .pipe(plugins.g.istanbul.hookRequire()) // Force `require` to return covered files
        .pipe(plugins.g.gFunction(function(){
            plugins.beautylog.ok("JS has been instrumentalized to get test code coverage!");
            done.resolve(configArg);
        },"atEnd"));
    return done.promise;
};

/**
 *
 * @returns {*}
 */
let mocha = function (configArg) {
    let done = plugins.Q.defer();
    npmtsOra.end(); // end npmtsOra for tests.
    let stream = plugins.gulp.src(["./test/test.js"])
        .pipe(plugins.g.mocha())
        .pipe(plugins.g.istanbul.writeReports()) // Creating the reports after tests ran
        .pipe(plugins.g.gFunction(function(){
            plugins.beautylog.ok("Tests have passed!");
            done.resolve(configArg);
        },"atEnd"));
    return done.promise;
};

let coverage = function(configArg){
    let done = plugins.Q.defer();
    plugins.smartcov.get.percentage(plugins.path.join(paths.coverageDir,"lcov.info"))
        .then(function(percentageArg){
            if (percentageArg >= configArg.coverageTreshold){
                plugins.beautylog.ok(
                    "your coverage of " + percentageArg.toString().blue + "% ".blue + "exceeds your treshold of " +
                    configArg.coverageTreshold.toString().blue + "%".blue
                );
            } else {
                plugins.beautylog.warn(
                    "your coverage of " + percentageArg + "% " + "fails your treshold of " +
                    configArg.coverageTreshold + "%"
                );
                plugins.beautylog.error("exiting due to coverage failure");
                process.exit(1);
            }
            done.resolve(configArg);
        });
    return done.promise;
};

export let run = function(configArg) {
    let done = plugins.Q.defer();
    let config = configArg;
    if(config.notest != true){
        npmtsOra.text("now starting tests");
        plugins.beautylog.log(
            "-------------------------------------------------------\n" +
            "*************************** TESTS: ***************************\n" +
            "--------------------------------------------------------------"
        );

        istanbul(config)
            .then(mocha)
            .then(coverage)
            .then(() => {
                done.resolve(config);
            });
    } else {
        npmtsOra.end();
        done.resolve(config);
    }
    return done.promise;
};