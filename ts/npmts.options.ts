/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");

export let isRelease = function():boolean {
    return plugins.smartci.check.isCi()
        && plugins.smartci.check.isTaggedCommit();
};

export let doPublish = function():boolean {
    return isRelease()
        && plugins.smartci.get.subJobNumber() == 1;
};

export var run = function(configArg){
    var done = plugins.Q.defer();
    var config = configArg;

    plugins.beautylog.log("now determining build options");

    //handle default mode
    if (config.mode == "default"){
        config.typings = [
            "./ts/typings.json"
        ];
        config.ts = {
            ["./ts/**/*.ts"]: "./dist/",
            ["./test/test.ts"]: "./test/"
        };
        config.test = ["./index.js"];
    }

    // handle state of current build

    isRelease() ? plugins.beautylog.info("All right: This is a RELEASE build!")
        : plugins.beautylog.info("NOT A RELEASE build!");
    isRelease() && doPublish() ? plugins.beautylog.info("All right: This is the first subBuild, so this one publishes coverage and docs when tests succeed!")
        : plugins.beautylog.info("We are not publishing anything!");

    // handle coveralls
    config.coveralls ? void(0) : config.coveralls = false;
    doPublish() ? void(0) : config.coveralls = false;

    config.coverageTreshold ? void(0) : config.coverageTreshold = 70;

    // handle docs
    config.docs ? void(0) : config.docs = {};
    config.docs.publish ? void(0) : config.docs.publish = false;
    doPublish() ? void(0) : config.docs.publish = false;

    done.resolve(config);
    return done.promise;
};