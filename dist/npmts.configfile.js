#!/usr/bin/env node

/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
exports.run = function () {
    var done = plugins.Q.defer();
    var config = {};
    var configPath = plugins.path.join(paths.cwd, "npmts.json");
    if (plugins.smartfile.checks.fileExistsSync(configPath)) {
        plugins.beautylog.info("npmts.json".blue + " config file found!");
        config = plugins.smartfile.readFileToObject(configPath);
        switch (config.mode) {
            case "default":
            case "custom":
                plugins.beautylog.log("mode is " + config.mode.yellow);
                done.resolve(config);
                break;
            default:
                plugins.beautylog.error("mode " + config.mode.yellow + " not recognised!".red);
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
