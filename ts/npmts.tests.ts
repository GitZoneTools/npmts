import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

/**
 *
 * @returns {*}
 */
let mocha = function (configArg) {
    npmtsOra.text("Instrumentalizing and testing transpiled JS");
    npmtsOra.end(); // end npmtsOra for tests.
    let done = plugins.Q.defer();
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd,"dist/*.js")])
        .pipe(plugins.g.sourcemaps.init())
        .pipe(plugins.g.babel({
            presets: [
                require.resolve("babel-preset-es2015")
            ]
        }))
        .pipe(plugins.g.istanbul({
        }))
        .pipe(plugins.g.sourcemaps.write())
        .pipe(plugins.g.injectModules())
        .on("finish",function(){
            plugins.gulp.src([plugins.path.join(paths.cwd,"test/test.js")])
            .pipe(plugins.g.babel({
                presets: [
                    plugins.path.join(paths.npmtsPackageRoot,"node_modules/babel-preset-es2015/index.js")
                ]
            }))
            .pipe(plugins.g.injectModules())
            .pipe(plugins.g.mocha())
            .pipe(plugins.g.istanbul.writeReports({
                dir: './coverage',
                reporters: [ 'lcovonly', 'json', 'text', 'text-summary']
            }))
            .pipe(plugins.g.gFunction(function(){
                plugins.beautylog.ok("Tested!");
                done.resolve(configArg);
            },"atEnd"));
        });
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

        mocha(config)
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