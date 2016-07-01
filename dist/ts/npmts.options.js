"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.isCi = function () {
    return plugins.smartci.check.isCi();
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    npmts_promisechain_1.npmtsOra.text("now determining build options...");
    //handle default mode
    if (config.mode == "default") {
        config.typings = [
            "./ts/typings.json"
        ];
        config.ts = (_a = {},
            _a["./ts/**/*.ts"] = "./dist/",
            _a
        );
        config.testTs = (_b = {},
            _b["./test/test.ts"] = "./test/",
            _b
        );
        config.test = ["./index.js"];
    }
    //check if config.tsOptions is available
    config.tsOptions ? void (0) : config.tsOptions = {};
    config.coverageTreshold ? void (0) : config.coverageTreshold = 70;
    // handle docs
    config.docs ? void (0) : config.docs = {};
    plugins.beautylog.ok("build options are ready!");
    done.resolve(config);
    return done.promise;
    var _a, _b;
};
