/// <reference path="./index.ts" />
module NpmtsTests {
    export var run = function() {
        var done = plugins.q.defer();
        plugins.fs.ensureDirSync(paths.testDir); //make sure that mocha has a directory to look for tests
        plugins.beautylog.info("Now running mocha tests");

        var mocha = new plugins.mocha(); // Instantiate a Mocha instance.
        mocha.addFile(
            plugins.path.join(paths.testDir, "test.js")
        );
        mocha.run(function(failures){
            process.on('exit', function () {
                process.exit(failures);
            });
        });
        return done.promise;
    }
}