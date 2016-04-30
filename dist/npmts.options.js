"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
exports.isCi = function () {
    return plugins.smartci.check.isCi();
};
exports.isRelease = function () {
    return plugins.smartci.check.isCi()
        && plugins.smartci.check.isTaggedCommit();
};
exports.doPublish = function () {
    return exports.isRelease()
        && plugins.smartci.get.subJobNumber() == 1;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    plugins.beautylog.log("now determining build options...");
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
    //check if config.tsOptions is available
    config.tsOptions ? void (0) : config.tsOptions = {};
    // handle state of current build
    exports.isRelease() ? plugins.beautylog.info("All right: This is a RELEASE build!")
        : plugins.beautylog.info("NOT A RELEASE build!");
    exports.isRelease() && exports.doPublish() ? plugins.beautylog.info("All right: This is the first subBuild, so this one publishes COVERAGE + DOCS when tests succeed!")
        : plugins.beautylog.info("We are not publishing anything!");
    // handle coveralls
    config.codecov ? void (0) : config.codecov = true;
    exports.isCi() ? void (0) : config.codecov = false;
    config.coverageTreshold ? void (0) : config.coverageTreshold = 70;
    // handle docs
    config.docs ? void (0) : config.docs = {};
    config.docs.publish ? void (0) : config.docs.publish = false;
    exports.doPublish() ? void (0) : config.docs.publish = false;
    plugins.beautylog.ok("build options are ready!");
    done.resolve(config);
    return done.promise;
    var _a;
};
