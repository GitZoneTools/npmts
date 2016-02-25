/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    if (typeof config.coveralls === "undefined") {
        config.coveralls = false;
    }
    if (config.mode == "default") {
        config.typings = [
            "./ts/"
        ];
        config.ts = (_a = {},
            _a["./ts/**/*.ts"] = "./dist/",
            _a["./test/test.ts"] = "./test/",
            _a
        );
        config.test = ["./index.js"];
        done.resolve(config);
    }
    else {
        done.resolve(config);
    }
    return done.promise;
    var _a;
};
