/// <reference path="./index.ts" />
module NpmtsTests {
    export var run = function(configArg) {
        var done = plugins.q.defer();
        var config = configArg;
        plugins.gulp.task('istanbul', function () {
            return plugins.gulp.src([plugins.path.join(paths.cwd,"index.js")])
                // Covering files
                .pipe(plugins.g.istanbul())
                // Force `require` to return covered files
                .pipe(plugins.g.istanbul.hookRequire());
        });

        plugins.gulp.task('mocha', function () {
            return plugins.gulp.src(['test/test.js'])
                .pipe(plugins.g.mocha())
                // Creating the reports after tests ran
                .pipe(plugins.g.istanbul.writeReports())
                // Enforce a coverage of at least 90%
                .pipe(plugins.g.istanbul.enforceThresholds({ thresholds: { global: 90 } }));
        });

        plugins.gulp.task("coveralls",function(){
            return plugins.gulp.src('coverage/**/lcov.info')
                .pipe(plugins.g.if(
                    (process.env.TRAVIS && config.coveralls),
                    plugins.g.coveralls()
                ));
        });

        plugins.gulp.task("test",function(){
            plugins.g.sequence("istanbul","mocha","coveralls",function(){
                done.resolve();
            })
        });
        plugins.gulp.start.apply(plugins.gulp, ['test']);
        return done.promise;
    }
}