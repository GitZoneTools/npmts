import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import NpmtsTests = require("./npmts.tests");
import NpmtsJsdoc = require("./npmts.jsdoc");


export let run = function(configArg){
    let done = plugins.Q.defer();
    let config = configArg;
    let promiseArray = [];
    config.codecov ? promiseArray.push(NpmtsTests.publishCoverage(configArg)) : void(0);
    config.docs.publish ? promiseArray.push(NpmtsJsdoc.publishDocs(configArg)) : void(0);
    promiseArray.length === 0 ? plugins.beautylog.info("Did not publish anything!") : void(0);

    plugins.Q.all(promiseArray).then(done.resolve);
    return done.promise;
};