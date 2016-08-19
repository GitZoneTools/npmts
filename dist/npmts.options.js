"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
;
exports.run = function (argvArg) {
    var done = plugins.Q.defer();
    var defaultConfig = {
        argv: undefined,
        coverageTreshold: 70,
        docs: true,
        mode: "default",
        test: true,
        testTs: {},
        ts: {},
        tsOptions: {}
    };
    // mix with configfile
    npmts_promisechain_1.npmtsOra.text("looking for npmextra.json");
    var config = plugins.npmextra.dataFor({
        toolName: "npmts",
        defaultSettings: defaultConfig,
        cwd: paths.cwd
    });
    // check mode
    switch (config.mode) {
        case "default":
        case "custom":
            plugins.beautylog.ok("mode is " + config.mode);
            done.resolve(config);
            break;
        default:
            plugins.beautylog.error("mode " + config.mode + " not recognised!".red);
            process.exit(1);
    }
    ;
    //handle default mode
    if (config.mode == "default") {
        config.ts = (_a = {},
            _a["./ts/**/*.ts"] = "./dist/",
            _a
        );
        config.testTs = (_b = {},
            _b["./test/test.ts"] = "./test/",
            _b
        );
    }
    ;
    // mix with commandline
    if (config.argv.notest) {
        config.test = false;
    }
    ;
    if (config.argv.nodocs) {
        config.docs = false;
    }
    ;
    plugins.beautylog.ok("build options are ready!");
    done.resolve(config);
    return done.promise;
    var _a, _b;
};
