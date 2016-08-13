"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
var genTypeDoc = function (configArg) {
    var done = plugins.Q.defer();
    npmts_promisechain_1.npmtsOra.text("now generating " + "TypeDoc documentation".yellow);
    plugins.beautylog.log("TypeDoc Output:");
    plugins.gulp.src(plugins.path.join(paths.tsDir, "**/*.ts"))
        .pipe(plugins.g.typedoc({
        // TypeScript options (see typescript docs) 
        module: "commonjs",
        target: "es6",
        includeDeclarations: true,
        // Output options (see typedoc docs) 
        out: paths.docsDir,
        json: plugins.path.join(paths.docsDir, "file.json"),
        // TypeDoc options (see typedoc docs) 
        name: "my-project",
        //theme: "default",
        ignoreCompilerErrors: true,
        version: true,
    }))
        .pipe(plugins.g.gFunction(done.resolve, "atEnd"));
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    if (configArg.nodocs) {
        done.resolve(configArg);
    }
    else {
        genTypeDoc(configArg)
            .then(function () {
            done.resolve(configArg);
        });
    }
    ;
    return done.promise;
};
