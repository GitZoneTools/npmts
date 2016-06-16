"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
exports.run = function (argvArg) {
    var done = plugins.Q.defer();
    var config = {};
    var configPath = plugins.path.join(paths.cwd, "npmts.json");
    if (argvArg.notest) {
        config.notest = true;
    }
    if (plugins.smartfile.checks.fileExistsSync(configPath)) {
        plugins.beautylog.info("npmts.json".blue + " config file found!");
        config = plugins.lodashObject.assign(config, plugins.smartfile.local.toObjectSync(configPath));
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
    }
    else {
        plugins.beautylog.log("no config file found: so mode is " + "default".yellow);
        config.mode = "default";
        done.resolve(config);
    }
    ;
    return done.promise;
};
