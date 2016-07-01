"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
var genJsdoc = function (configArg) {
    var done = plugins.Q.defer();
    npmts_promisechain_1.npmtsOra.text("now generating " + "JsDoc documentation".yellow);
    plugins.gulp.src([
        plugins.path.join(paths.cwd, "README.md"),
        plugins.path.join(paths.distDir, "**/*.js")
    ])
        .pipe(plugins.g.jsdoc3({
        opts: {
            destination: paths.docsDir
        }
    }, function () {
        plugins.beautylog.ok("JsDoc documentation has been generated!");
        done.resolve(configArg);
    }));
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    genJsdoc(configArg)
        .then(done.resolve);
    return done.promise;
};
