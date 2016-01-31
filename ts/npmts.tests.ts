/// <reference path="./index.ts" />
module NpmtsTests {
    export var run = function() {
        var done = plugins.q.defer();
        plugins.fs.ensureDirSync(paths.testDir); //make sure that mocha has a directory to look for tests
        plugins.beautylog.info("Now running mocha tests");
        var mocha = new plugins.mocha(); // Instantiate a Mocha instance.

        // Add each .js file to the mocha instance
        plugins.fs.readdirSync(paths.testDir).filter(function(file){
            // Only keep the .js files
            return file.substr(-3) === '.js';

        }).forEach(function(file){
            mocha.addFile(
                plugins.path.join(paths.testDir, file)
            );
        });

        // Run the tests.
        mocha.run(function(failures){
            process.on('exit', function () {
                process.exit(failures);
            });
        });
        return done.promise;
    }
}