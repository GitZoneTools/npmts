"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (argvArg) {
    var done = plugins.Q.defer();
    npmts_promisechain_1.npmtsOra.text("looking for npmextra.json");
    var defaultConfig = {
        mode: "default",
        notest: false
    };
    if (argvArg.notest) {
        defaultConfig.notest = true;
    }
    ;
    var config = plugins.npmextra.dataFor({
        toolName: "npmts",
        defaultSettings: defaultConfig,
        cwd: paths.cwd
    });
    switch (config.mode) {
        case "default":
        case "custom":
            plugins.beautylog.ok("mode is " + config.mode.yellow);
            done.resolve(config);
            break;
        default:
            plugins.beautylog.error("mode " + config.mode.yellow + " not recognised!".red);
            process.exit(1);
    }
    ;
    done.resolve(config);
    return done.promise;
};
