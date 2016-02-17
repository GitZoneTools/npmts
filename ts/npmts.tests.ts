/// <reference path="./index.ts" />
module NpmtsTests {
    export var run = function(configArg) {
        var done = plugins.q.defer();
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
            var stream = plugins.gulp.src([plugins.path.join(paths.cwd,"./coverage/lcov.info")])
                .pipe(plugins.g.coveralls());
            return stream;
        };

        istanbul().on("finish",function(){
            mocha().on("finish",function(){
                if(process.env.TRAVIS && config.coveralls){
                    coveralls().on("finish",function(){
                        done.resolve(config);
                    })
                } else {
                    done.resolve(config);
                }
            })
        });
        return done.promise;
    }
}