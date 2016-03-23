"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
exports.isRelease = function () {
    if (plugins.smartci.check.isCi() && plugins.smartci.check.isTaggedCommit()) {
        return true;
    }
    else {
        return false;
    }
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    plugins.beautylog.log("now determining build options");
    //handle default mode
    if (config.mode == "default") {
        config.typings = [
            "./ts/typings.json"
        ];
        config.ts = (_a = {},
            _a["./ts/**/*.ts"] = "./dist/",
            _a["./test/test.ts"] = "./test/",
            _a
        );
        config.test = ["./index.js"];
    }
    // handle state of current build
    exports.isRelease() ? plugins.beautylog.info("All right this is a release build!")
        : plugins.beautylog.info("not a release build!");
    // handle coveralls
    if ((typeof config.coveralls === "undefined" || !exports.isRelease())
        && plugins.smartci.get.subJobNumber == 1) {
        config.coveralls = false;
    }
    done.resolve(config);
    return done.promise;
    var _a;
};
