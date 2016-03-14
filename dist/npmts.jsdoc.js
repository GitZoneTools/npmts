"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var genJsdoc = function (configArg) {
    var done = plugins.Q.defer();
    plugins.beautylog.log("now generating " + "JsDoc documentation".blue);
    plugins.gulp.src([
        plugins.path.join(paths.cwd, "README.md"),
        plugins.path.join(paths.distDir, "**/*.js")
    ])
        .pipe(plugins.g.jsdoc3({
        opts: {
            destination: paths.docsDir
        }
    }, function () {
        plugins.beautylog.ok("JsDoc has been generated!");
        done.resolve(configArg);
    }));
    return done.promise;
};
var publishDocs = function (configArg) {
    var done = plugins.Q.defer();
    var gitUrl = plugins.projectinfo.npm(paths.cwd, {
        gitAccessToken: process.env.GITHUB_TOKEN
    }).git.httpsUrl;
    var deployScript = ""
        + "cd " + paths.docsDir + " "
        + "&& git init " + "> /dev/null 2>&1 "
        + "&& git config user.name \"TRAVIS CI\" " + "> /dev/null 2>&1 "
        + "&& git config user.email \"travis@shipzone.io\" " + "> /dev/null 2>&1 "
        + "&& git add . " + "> /dev/null 2>&1 "
        + "&& git commit -m \"Deploy to GitHub Pages\" " + "> /dev/null 2>&1 "
        + "&& git push --force --quiet "
        + "\"" + gitUrl + "\" "
        + "master:gh-pages " + "> /dev/null 2>&1";
    if (plugins.smartenv.getEnv().isTravis && configArg.docs && configArg.docs.publish) {
        plugins.beautylog.log("now publishing docs to GitHub");
        if (!plugins.shelljs.which('git')) {
            plugins.beautylog.error('Git is not installed!');
            plugins.shelljs.exit(1);
        }
        else if (plugins.shelljs.exec(deployScript).code !== 0) {
            plugins.beautylog.error('Git failed!');
            plugins.shelljs.exit(1);
        }
        plugins.beautylog.ok("JsDoc has been deployed to GitHub!");
        done.resolve(configArg);
    }
    else {
        done.resolve(configArg);
    }
    return done.promise;
};
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    genJsdoc(configArg)
        .then(publishDocs)
        .then(done.resolve);
    return done.promise;
};
