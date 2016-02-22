/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

var genJsdoc = function(){
    var done = plugins.Q.defer();
    plugins.beautylog.log("now generating " + "JsDoc documentation".blue);
    plugins.gulp.src([
            plugins.path.join(paths.cwd,"README.md"),
            plugins.path.join(paths.distDir,"**/*.js")
        ])
        .pipe(plugins.g.jsdoc3({
            opts: {
                destination: paths.docsDir
            }
        }, done.resolve));
    return done.promise;
};

var publishDocs = function(){
    var done = plugins.Q.defer();

    var deployScript = "" +
        "cd " + paths.docsDir + " " +
        "&& git init " +
        "&& git config user.name \"TRAVIS CI\" " +
        "&& git config user.email \"travis@shipzone.io\" " +
        "&& git add . " +
        "&& git commit -m \"Deploy to GitHub Pages\" " +
        "&& git push --force --quiet \"https://${GH_TOKEN}@${GH_REF}\" master:gh-pages > /dev/null 2>&1";

    if(true || plugins.smartenv.getEnv().isTravis){
        plugins.beautylog.log("now publishing docs to GitHub")
        if (!plugins.shelljs.which('git')) {
            plugins.beautylog.error('Git is not installed');
            plugins.shelljs.exit(1);
        } else if (plugins.shelljs.exec(deployScript).code !== 0) {
            plugins.beautylog.error('Error: Git failed');
            plugins.shelljs.exit(1);
        }
        done.resolve();
    } else {
        done.resolve();
    }
    return done.promise;
};


export var run = function(){
    var done = plugins.Q.defer();
    genJsdoc()
        .then(publishDocs)
        .then(done.resolve);
    return done.promise;
};