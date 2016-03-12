/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
export var run = function(configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    var istanbul = function () {
        var stream = plugins.gulp.src([plugins.path.join(paths.cwd,"dist/*.js")])
            // Covering files
            .pipe(plugins.g.istanbul())
            // Force `require` to return covered files
            .pipe(plugins.g.istanbul.hookRequire());
        return stream;
    };

    var mocha = function () {
        var stream = plugins.gulp.src(["./test/test.js"])
            .pipe(plugins.g.mocha())
            // Creating the reports after tests ran
            .pipe(plugins.g.istanbul.writeReports())
            // Enforce a coverage of at least 90%
            .pipe(plugins.g.istanbul.enforceThresholds({ thresholds: { global: 30 } }));
        return stream;
    };

    var coveralls = function(){
        plugins.beautylog.log("now uploading coverage data to coveralls");
        var stream = plugins.gulp.src([plugins.path.join(paths.cwd,"./coverage/lcov.info")])
            .pipe(plugins.g.coveralls())
            .pipe(plugins.g.gFunction(function(){
                plugins.beautylog.ok("coverage data has beend uploaded Coveralls!");
            },"atEnd"));
        return stream;
    };

    plugins.beautylog.log("now starting tests");
    istanbul().on("finish",function(){
        mocha().on("finish",function(){
            if(plugins.smartenv.getEnv().isTravis && config.coveralls){
                coveralls().on("finish",function(){
                    done.resolve(config);
                })
            } else {
                plugins.beautylog.ok("Tests have passed!");
                done.resolve(config);
            }
        })
    });
    return done.promise;
};