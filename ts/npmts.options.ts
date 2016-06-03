import "typings-global";
import plugins = require("./npmts.plugins");
import {npmtsOra} from "./npmts.promisechain";

export let isCi = function(){
    return plugins.smartci.check.isCi();
};

export let isRelease = function():boolean {
    return plugins.smartci.check.isCi()
        && plugins.smartci.check.isTaggedCommit();
};

export let doPublish = function():boolean {
    try {
        return isRelease()
            && plugins.smartci.get.subJobNumber() == 1;
    }
    catch (err){
        return false;
    }  
};

export var run = function(configArg){
    var done = plugins.Q.defer();
    var config = configArg;

    npmtsOra.text("now determining build options...");

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
    
    //check if config.tsOptions is available
    config.tsOptions ? void(0) : config.tsOptions = {};

    // handle state of current build

    isRelease() ? plugins.beautylog.info("All right: This is a RELEASE build!")
        : plugins.beautylog.info("NOT A RELEASE build!");
    isRelease() && doPublish() ? plugins.beautylog.info("All right: This is the first subBuild, so this one publishes COVERAGE + DOCS when tests succeed!")
        : plugins.beautylog.info("We are not publishing anything!");

    

    config.coverageTreshold ? void(0) : config.coverageTreshold = 70;

    // handle docs
    config.docs ? void(0) : config.docs = {};
    config.docs.publish ? void(0) : config.docs.publish = false;
    doPublish() ? void(0) : config.docs.publish = false;

    plugins.beautylog.ok("build options are ready!");
    done.resolve(config);
    return done.promise;
};