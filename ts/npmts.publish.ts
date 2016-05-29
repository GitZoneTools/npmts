import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import NpmtsJsdoc = require("./npmts.jsdoc");

export let publishCoverage = function(configArg){
    let done = plugins.Q.defer();
    plugins.beautylog.log("now uploading coverage data to codecov.io");
    var stream = plugins.gulp.src([plugins.path.join(paths.cwd,"./coverage/lcov.info")])
        .pipe(plugins.g.codecov())
        .pipe(plugins.g.gFunction(function(){
            plugins.beautylog.ok("Coverage data has been uploaded to codecov.io!");
            done.resolve(configArg);
        },"atEnd"));
    return done.promise;
};

export let run = function(configArg){
    let done = plugins.Q.defer();
    let config = configArg;
    let promiseArray = [];
    config.codecov.publish ? promiseArray.push(publishCoverage(configArg)) : void(0);
    config.docs.publish ? promiseArray.push(NpmtsJsdoc.publishDocs(configArg)) : void(0);
    promiseArray.length === 0 ? plugins.beautylog.info("Did not publish anything!") : void(0);

    plugins.Q.all(promiseArray).then(done.resolve);
    return done.promise;
};