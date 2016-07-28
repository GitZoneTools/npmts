import "typings-global";
import plugins = require("./npmts.plugins");
import {npmtsOra} from "./npmts.promisechain";

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
            ["./ts/**/*.ts"]: "./dist/"
        };
        config.testTs = {
            ["./test/test.ts"]: "./test/"
        };
        config.test = ["./index.js"];
    }
    
    //check if config.tsOptions is available
    config.tsOptions ? void(0) : config.tsOptions = {};

    

    config.coverageTreshold ? void(0) : config.coverageTreshold = 70;

    // handle docs
    config.docs ? void(0) : config.docs = {};

    plugins.beautylog.ok("build options are ready!");
    done.resolve(config);
    return done.promise;
};