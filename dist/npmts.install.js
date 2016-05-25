"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
exports.run = function (configArg) {
    var config = configArg;
    var done = plugins.Q.defer();
    /* -------------------------------------------------
     * ----------- install typings ---------------
     * ----------------------------------------------- */
    npmts_promisechain_1.npmtsOra.text("now installing " + "typings".yellow);
    var absoluteTypingsArray = plugins.smartpath.transform.toAbsolute(config.typings, paths.cwd);
    plugins.gulp.src(absoluteTypingsArray)
        .pipe(plugins.g.typings())
        .pipe(plugins.g.gFunction(function () {
        plugins.beautylog.ok("typings installed!");
        done.resolve(config);
    }, "atEnd"));
    return done.promise;
};
