/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
export var run = function(configArg){
    var done = plugins.Q.defer();
    var config = configArg;
    if (typeof config.coveralls === "undefined"){
        config.coveralls = false;
    }
    if (config.mode == "default"){
        config.typings = [
            "./ts/typings.json"
        ];
        config.ts = {
            ["./ts/**/*.ts"]: "./dist/",
            ["./test/test.ts"]: "./test/"
        };
        config.test = ["./index.js"];
        done.resolve(config);
    } else {
        done.resolve(config);
    }
    return done.promise;
};