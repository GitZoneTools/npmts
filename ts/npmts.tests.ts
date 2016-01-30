/// <reference path="./index.ts" />
module NpmtsTests {
    export var run = function() {
        var done = plugins.q.defer();
        plugins.beautylog.info("Now running mocha tests");
        // Instantiate a Mocha instance.
        var mocha = new plugins.mocha();

        var testDir = paths.testDir;

        // Add each .js file to the mocha instance
        plugins.fs.readdirSync(testDir).filter(function(file){
            // Only keep the .js files
            return file.substr(-3) === '.js';

        }).forEach(function(file){
            mocha.addFile(
                plugins.path.join(testDir, file)
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