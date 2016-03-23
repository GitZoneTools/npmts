/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");

export let isRelease = function():boolean {
    if (plugins.smartci.check.isCi() && plugins.smartci.isTaggedCommit()){
        return true;
    } else {
        return false;
    }
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

    isRelease() ? plugins.beautylog.info("All right this is a release build!")
        : plugins.beautylog.info("not a release build!");

    // handle coveralls
    if (
        (typeof config.coveralls === "undefined" || !isRelease())
        && plugins.smartci.get.subJobNumber == 1
    ){
        config.coveralls = false;
    }

    done.resolve(config);
    return done.promise;
};